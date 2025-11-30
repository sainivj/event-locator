import { Outlet } from 'react-router-dom';
import { DesktopHeader } from './DesktopHeader';
import { MobileTopBar } from './MobileTopBar'; // IMPORT ADDED
import { MobileBottomNav } from './MobileBottomNav';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* Navigation Layer */}
      <DesktopHeader />
      <MobileTopBar /> {/* ADDED: Only visible on mobile */}
      
      {/* Main Content Wrapper 
         - pt-16: Mobile Top Bar height
         - md:pt-20: Desktop Header height
         - pb-20: Mobile Bottom Bar height
         - md:pb-0: No Bottom Bar on Desktop
      */}
      <main className="pt-16 md:pt-20 pb-20 md:pb-0 min-h-screen">
        <Outlet />
      </main>

      <MobileBottomNav />
    </div>
  );
};