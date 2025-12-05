import React from 'react';
import { Send } from 'lucide-react';

export const Newsletter = () => {
  return (
    <div className="bg-gray-100 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Join Our Newsletter</h2>
        <p className="text-gray-600 mb-8">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-slate-900 shadow-sm"
          />
          <button className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-md">
            Subscribe <Send size={18} />
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-4">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </div>
  );
};