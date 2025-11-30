import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MobileTopBar = () => {
  return (
    <header className="md:hidden fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50 px-4 h-14 flex items-center justify-between">
      {/* Brand */}
      <Link to="/" className="flex items-center gap-2">
        <div className="h-6 w-6 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">
          C
        </div>
        <span className="font-extrabold text-gray-900 tracking-tight">CityPulse</span>
      </Link>

      {/* Search Trigger (Functionality to be expanded, currently just links to top) */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-full"
      >
        <Search className="h-5 w-5" />
      </button>
    </header>
  );
};