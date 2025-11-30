import { Heart } from 'lucide-react';

export const SavedEvents = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center px-6">
      <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Heart className="h-8 w-8 text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">No Saved Events</h2>
      <p className="text-gray-500 mt-2 max-w-sm">
        Start exploring and tap the heart icon to save events you're interested in.
      </p>
    </div>
  );
};