import { Search, Bell, UserCircle } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom'; // Changed: Import NavLink for active states
import { cn } from '../../utils/cn'; // Import cn utility

export const DesktopHeader = () => {
  return (
    <header className="hidden md:block fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            C
          </div>
          <span className="text-xl font-extrabold text-gray-900 tracking-tight">CityPulse</span>
        </Link>

        {/* Omnibox Placeholder */}
        <div className="flex-1 max-w-2xl relative">
          <div className="flex items-center w-full bg-gray-100 border border-gray-200 rounded-full px-4 py-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <Search className="h-5 w-5 text-gray-500 mr-3" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">Anywhere</span>
              <span className="text-xs text-gray-500">Search events, neighborhoods, or categories</span>
            </div>
          </div>
        </div>

        {/* Right Actions - NOW WITH MAP LINK */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <NavLink 
            to="/" 
            className={({ isActive }) => cn(
              "font-medium text-sm transition-colors",
              isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
            )}
          >
            Explore
          </NavLink>

          <NavLink 
            to="/map" 
            className={({ isActive }) => cn(
              "font-medium text-sm transition-colors",
              isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
            )}
          >
            Map
          </NavLink>

          <NavLink 
            to="/saved" 
            className={({ isActive }) => cn(
              "font-medium text-sm transition-colors",
              isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
            )}
          >
            Saved
          </NavLink>

          <div className="h-6 w-px bg-gray-300 mx-1" /> {/* Divider */}

          <button className="text-gray-600 hover:text-gray-900">
            <Bell className="h-5 w-5" />
          </button>
          
          <button className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1.5 hover:shadow-md transition-all">
            <UserCircle className="h-6 w-6 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Menu</span>
          </button>
        </div>

      </div>
    </header>
  );
};