import React from 'react';
import { Category } from '../types';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onNavigate: (page: string, category: Category) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 min-h-[500px] md:h-[600px]">
        
        {/* Men (Young Boy 18-22) */}
        <div className="relative group h-[350px] md:h-full overflow-hidden cursor-pointer" onClick={() => onNavigate('shop', 'men')}>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10" />
          <img 
            src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80" 
            alt="Young Men Fashion" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-10 left-6 z-20 text-white">
            <p className="text-sm font-semibold uppercase tracking-wider mb-2 text-accent">Winter Edit</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Young Men</h2>
            <button className="flex items-center gap-2 text-sm font-medium hover:underline">
              Shop Now <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Women (Young Girl 18-22) */}
        <div className="relative group h-[350px] md:h-full overflow-hidden cursor-pointer" onClick={() => onNavigate('shop', 'women')}>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10" />
          <img 
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80" 
            alt="Young Women Fashion" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-10 left-6 z-20 text-white">
            <p className="text-sm font-semibold uppercase tracking-wider mb-2 text-accent">Trending Now</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Young Women</h2>
            <button className="flex items-center gap-2 text-sm font-medium hover:underline">
              Shop Now <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Kids (Boy & Girl) */}
        <div className="relative group h-[350px] md:h-full overflow-hidden cursor-pointer" onClick={() => onNavigate('shop', 'kids')}>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10" />
          <img 
            src="https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=1200&q=80" 
            alt="Kids Fashion" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-10 left-6 z-20 text-white">
            <p className="text-sm font-semibold uppercase tracking-wider mb-2 text-accent">Cozy & Fun</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Kids Collection</h2>
            <button className="flex items-center gap-2 text-sm font-medium hover:underline">
              Shop Now <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};