import { X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Omnibox } from './Omnibox';

export const MobileSearchModal = () => {
  const { isMobileSearchOpen, setMobileSearchOpen } = useStore();

  if (!isMobileSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white md:hidden animate-in slide-in-from-bottom duration-200">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100">
        <h2 className="font-bold text-lg text-gray-900">Search</h2>
        <button 
          onClick={() => setMobileSearchOpen(false)}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 pt-6">
        <p className="text-sm text-gray-500 mb-4 font-medium">
          Find events by keyword or neighborhood
        </p>
        
        {/* Reuse the Omnibox - functionality already exists! */}
        <Omnibox />
        
        <div className="mt-6">
           <p className="text-xs text-gray-400 text-center">
             Try searching for "Jazz" or "Kensington"
           </p>
        </div>
      </div>
    </div>
  );
};