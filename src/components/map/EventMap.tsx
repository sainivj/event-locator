// REMOVED: Unused 'useEffect'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// CHANGED: "import * as L" fixes the "no default export" error
import * as L from 'leaflet'; 
import { useStore } from '../../store/useStore';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Type assertion to bypass TypeScript checks on the global L object internal prototype
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const EventMap = () => {
  const { filteredEvents } = useStore();

  // Default Center (Toronto)
  const defaultCenter: [number, number] = [43.6532, -79.3832];
  const defaultZoom = 13;

  return (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-inner border border-gray-200 relative z-0">
      <MapContainer 
        center={defaultCenter} 
        zoom={defaultZoom} 
        scrollWheelZoom={false} 
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {filteredEvents.map((event) => (
          <Marker 
            key={event.id} 
            position={[event.coordinates.lat, event.coordinates.lng]}
          >
            <Popup>
              <div className="min-w-[150px]">
                <h3 className="font-bold text-gray-800">{event.title}</h3>
                <p className="text-sm text-gray-600 my-1">{event.venueName}</p>
                <div className="text-xs font-semibold text-blue-600 uppercase">
                  {event.category}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default EventMap;