import { Bell, UserCircle } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';
// CRITICAL IMPORT: This brings in the real input field
import { Omnibox } from '../navigation/Omnibox';

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

        {/* --- CHANGE IS HERE --- */}
        {/* We are replacing the static "Anywhere" div with the real Omnibox component */}
        <div className="flex-1 flex justify-center max-w-2xl">
          <Omnibox />
        </div>
        {/* ---------------------- */}

        {/* Right Actions */}
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

          <div className="h-6 w-px bg-gray-300 mx-1" />

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