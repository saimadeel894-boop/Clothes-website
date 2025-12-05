import React from 'react';

interface PromoBannerProps {
  onNavigate: (page: string, category: any) => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onNavigate }) => {
  return (
    <div className="relative bg-slate-900 text-white py-20 px-4 my-12 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <img 
          src="https://images.unsplash.com/photo-1548624149-f32195f560e2?auto=format&fit=crop&w=1600&q=80" 
          className="w-full h-full object-cover" 
          alt="Sale Background"
        />
      </div>
      <div className="relative max-w-7xl mx-auto text-center z-10">
        <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-sm">
          Limited Time Offer
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Winter Clearance Sale</h2>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Get up to 50% off on selected premium winter jackets and hoodies. Upgrade your wardrobe before the season ends.
        </p>
        <button 
          onClick={() => onNavigate('shop', 'men')}
          className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg"
        >
          Shop The Sale
        </button>
      </div>
    </div>
  );
};