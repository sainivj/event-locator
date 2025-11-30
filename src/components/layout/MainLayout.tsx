import { Outlet } from 'react-router-dom';
import { DesktopHeader } from './DesktopHeader';
import { MobileTopBar } from './MobileTopBar';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileSearchModal } from '../navigation/MobileSearchModal'; // Import Added

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* Navigation Layer */}
      <DesktopHeader />
      <MobileTopBar />
      
      {/* Modal - only renders if open */}
      <MobileSearchModal /> 

      {/* Main Content Wrapper */}
      <main className="pt-16 md:pt-20 pb-20 md:pb-0 min-h-screen">
        <Outlet />
      </main>

      <MobileBottomNav />
    </div>
  );
};