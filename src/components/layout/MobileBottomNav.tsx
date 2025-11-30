import { NavLink } from 'react-router-dom';
import { Home, Map, Heart, User } from 'lucide-react';
import { cn } from '../../utils/cn';

export const MobileBottomNav = () => {
  const navItems = [
    { label: 'Explore', icon: Home, path: '/' },
    { label: 'Map', icon: Map, path: '/map' },
    { label: 'Saved', icon: Heart, path: '/saved' },
    { label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
              isActive ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("h-6 w-6", isActive && "fill-current")} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};