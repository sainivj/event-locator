import { 
  Music, 
  Trophy, 
  Palette, 
  Code, 
  Briefcase, 
  Utensils, 
  LayoutGrid 
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface CategoryFilterBarProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

// Map string keys to actual Lucide components
const ICON_MAP: Record<string, React.ElementType> = {
  all: LayoutGrid,
  music: Music,
  sports: Trophy,
  arts: Palette,
  tech: Code,
  business: Briefcase,
  food: Utensils,
};

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'music', label: 'Music' },
  { id: 'sports', label: 'Sports' },
  { id: 'arts', label: 'Arts' },
  { id: 'tech', label: 'Tech' },
  { id: 'business', label: 'Business' },
];

export const CategoryFilterBar = ({ activeCategory, onSelectCategory }: CategoryFilterBarProps) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide py-4">
      <div className="flex gap-3 px-4 md:px-0 min-w-max">
        {CATEGORIES.map((cat) => {
          const Icon = ICON_MAP[cat.id] || LayoutGrid;
          const isActive = activeCategory === cat.id;
          
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all border",
                isActive 
                  ? "bg-gray-900 text-white border-gray-900 shadow-md scale-105" 
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              )}
            >
              <Icon className="h-4 w-4" />
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};