import { useEffect } from 'react'; // ADDED: useEffect
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'; // ADDED: useMap
import { Link } from 'react-router-dom';
import * as L from 'leaflet'; 
import { useStore } from '../../store/useStore';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// === NEW HELPER COMPONENT ===
// This component sits inside the map and listens for visibility changes.
// When 'activeView' changes, it tells the map to re-calculate its dimensions.
const MapResizer = ({ activeView }: { activeView: string }) => {
  const map = useMap();

  useEffect(() => {
    // We set a small timeout to ensure the CSS transition (hidden -> block) 
    // has finished rendering the DOM element before we ask Leaflet to measure it.
    setTimeout(() => {
      map.invalidateSize();
    }, 200); 
  }, [map, activeView]);

  return null;
};
// =============================

interface EventMapProps {
  activeView?: 'list' | 'map';
}

const EventMap = ({ activeView = 'map' }: EventMapProps) => {
  const { filteredEvents } = useStore();
  const defaultCenter: [number, number] = [43.6532, -79.3832];
  const defaultZoom = 13;

  return (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-inner border border-gray-200 relative z-0">
      <MapContainer 
        center={defaultCenter} 
        zoom={defaultZoom} 
        scrollWheelZoom={false} 
        className="h-full w-full"
        tap={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* ADDED: The Resizer Helper */}
        <MapResizer activeView={activeView} />

        {filteredEvents.map((event) => (
          <Marker 
            key={event.id} 
            position={[event.coordinates.lat, event.coordinates.lng]}
            eventHandlers={{
              click: (e) => {
                e.target.getMap().setView(e.latlng, e.target.getMap().getZoom());
              },
            }}
          >
            <Popup autoPan={false} closeButton={false} className="custom-popup">
              <Link to={`/event/${event.slug}`} className="block min-w-[160px] no-underline focus:outline-none">
                <h3 className="font-bold text-gray-900 hover:text-blue-600 transition-colors text-base">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600 my-1 font-medium">{event.venueName}</p>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                  <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wide bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {event.category}
                  </div>
                  <span className="text-xs text-blue-500 font-semibold flex items-center gap-1">
                    Details &rarr;
                  </span>
                </div>
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default EventMap;