import EventMap from '../components/map/EventMap';

export const MapView = () => {
  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] w-full relative bg-gray-200">
      <div className="absolute inset-0 z-0">
        <EventMap activeView="map" />
      </div>
      
      {/* Mobile Overlay Helper */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[400] bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-md text-sm font-bold text-gray-700 md:hidden">
        Browsing Map
      </div>
    </div>
  );
};