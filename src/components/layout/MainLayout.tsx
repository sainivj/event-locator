import { Outlet } from 'react-router-dom';
import { DesktopHeader } from './DesktopHeader';
import { MobileBottomNav } from './MobileBottomNav';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Responsive Navigation Strategy:
        - DesktopHeader: Hidden on mobile (hidden md:block)
        - MobileBottomNav: Hidden on desktop (md:hidden)
      */}
      <DesktopHeader />
      
      {/* Main Content Area 
        - pt-20: Adds top padding on desktop to clear the sticky header
        - pb-20: Adds bottom padding on mobile to clear the sticky nav
      */}
      <main className="pt-0 md:pt-20 pb-20 md:pb-0 min-h-screen">
        <Outlet />
      </main>

      <MobileBottomNav />
    </div>
  );
};