import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ArrowLeft, MapPin, Calendar, Share2, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet Icons (Same as before)
import * as L from 'leaflet';
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

export const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { rawEvents, fetchEvents, isLoading } = useStore();

  // 1. Ensure data is loaded (handle refresh)
  useEffect(() => {
    if (rawEvents.length === 0) {
      fetchEvents();
    }
  }, [rawEvents.length, fetchEvents]);

  // 2. Find the event
  const event = rawEvents.find((e) => e.slug === slug);

  // 3. Loading State
  if (isLoading || (rawEvents.length === 0 && !event)) {
    return <div className="p-10 text-center">Loading Details...</div>;
  }

  // 4. Not Found State
  if (!event) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold">Event not found</h2>
        <button onClick={() => navigate('/')} className="text-blue-600 underline mt-4">
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Navbar / Back Button */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-20 flex justify-between items-center">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Map
        </button>
        <span className="text-sm font-bold text-gray-400">CityPulse Event</span>
      </div>

      {/* Hero Image */}
      <div className="w-full h-64 md:h-96 relative bg-gray-200">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 md:left-12 text-white">
          <span className="px-2 py-1 bg-blue-600 text-xs font-bold uppercase rounded mb-2 inline-block">
            {event.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold shadow-sm">{event.title}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10 grid md:grid-cols-3 gap-6">
        
        {/* Left Col: Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4">About this Event</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{event.description}</p>
            
            <div className="flex flex-wrap gap-2 mt-6">
              {event.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-500" /> Location
            </h3>
            {/* Mini Map */}
            <div className="h-48 w-full rounded-lg overflow-hidden border border-gray-200">
              <MapContainer 
                center={[event.coordinates.lat, event.coordinates.lng]} 
                zoom={14} 
                scrollWheelZoom={false}
                className="h-full w-full"
                zoomControl={false}
              >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                <Marker position={[event.coordinates.lat, event.coordinates.lng]} />
              </MapContainer>
            </div>
            <p className="mt-2 font-medium text-gray-800">{event.venueName}</p>
            <button className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              <Navigation className="h-4 w-4" /> Get Directions
            </button>
          </div>
        </div>

        {/* Right Col: Info Card */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-24">
            <div className="flex items-start gap-4 mb-6">
              <Calendar className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="font-bold text-gray-900">
                  {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-gray-600">
                  {new Date(event.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-1">Ticket Price</p>
              <p className="text-2xl font-bold text-green-600">
                ${event.priceRange.min} - ${event.priceRange.max}
              </p>
            </div>

            <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-all flex justify-center gap-2 mb-3">
              Get Tickets
            </button>
            <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-50 transition-all flex justify-center gap-2">
              <Share2 className="h-4 w-4" /> Share
            </button>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="font-semibold text-sm mb-3">Amenities</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className={event.metadata.isFamilyFriendly ? "text-green-700 flex gap-2" : "text-gray-400 flex gap-2"}>
                  ✓ Family Friendly
                </li>
                <li className={event.metadata.isWheelchairAccessible ? "text-green-700 flex gap-2" : "text-gray-400 flex gap-2"}>
                  ✓ Wheelchair Accessible
                </li>
                <li className={event.metadata.hasParking ? "text-green-700 flex gap-2" : "text-gray-400 flex gap-2"}>
                  ✓ Parking Available
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};