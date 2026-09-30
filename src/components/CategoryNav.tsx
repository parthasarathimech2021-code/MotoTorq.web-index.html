import React from 'react';
import { 
  Disc, 
  Repeat, 
  GitFork, 
  Flame, 
  Zap, 
  Cog, 
  Sliders, 
  Thermometer, 
  LayoutGrid 
} from 'lucide-react';
import { PartCategory } from '../types';
import { useInventory } from '../context/InventoryContext';

interface CategoryItem {
  id: PartCategory | 'all';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORIES: CategoryItem[] = [
  { id: 'all', label: 'All Spare Parts', icon: LayoutGrid },
  { id: 'brakes', label: 'Brakes & Rotors', icon: Disc },
  { id: 'drivetrain', label: 'Chain & Drivetrain', icon: Repeat },
  { id: 'suspension', label: 'Suspension & Shocks', icon: GitFork },
  { id: 'exhaust', label: 'Exhaust Systems', icon: Flame },
  { id: 'engine', label: 'Engine & Filters', icon: Cog },
  { id: 'electrical', label: 'Electrical & Plugs', icon: Zap },
  { id: 'controls', label: 'Controls & Rearsets', icon: Sliders },
  { id: 'cooling', label: 'Cooling & Radiators', icon: Thermometer },
];

export const CategoryNav: React.FC = () => {
  const { activeCategory, setActiveCategory, parts } = useInventory();

  // Get item counts per category
  const getCount = (catId: PartCategory | 'all') => {
    if (catId === 'all') return parts.length;
    return parts.filter(p => p.category === catId).length;
  };

  return (
    <div className="border-y border-neutral-800 bg-neutral-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            const count = getCount(cat.id);

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/10'
                    : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-850'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-neutral-950' : 'text-neutral-400'}`} />
                <span>{cat.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isActive ? 'bg-neutral-950/20 text-neutral-900 font-bold' : 'bg-neutral-800 text-neutral-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
