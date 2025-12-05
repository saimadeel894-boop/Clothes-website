import React from 'react';
import { Target, Heart, Globe } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80" alt="Team" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About AhmedHub</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Redefining style with a curated selection of global fashion trends for the modern generation.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg mx-auto text-gray-600">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Our Story</h2>
          <p className="mb-6">
            Welcome to <strong>AhmedHub</strong>, your number one source for all things fashion. We're dedicated to giving you the very best of winter and summer clothing, with a focus on dependability, customer service, and uniqueness.
          </p>
          <p className="mb-6">
            Founded in 2024, AhmedHub has come a long way from its beginnings. When we first started out, our passion for "Eco-friendly and Affordable Fashion" drove us to do intense research, so that AhmedHub can offer you the world's most advanced fashion trends. We now serve customers all over the world and are thrilled that we're able to turn our passion into our own website.
          </p>
          <p>
            We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                    <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Target size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                    <p className="text-gray-500">To provide high-quality, trendy clothing accessible to everyone, everywhere.</p>
                </div>
                 <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                    <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Heart size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Our Passion</h3>
                    <p className="text-gray-500">We love fashion and we love seeing our customers look their best in our curated picks.</p>
                </div>
                 <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                    <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Globe size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Global Reach</h3>
                    <p className="text-gray-500">Connecting styles from around the world directly to your doorstep.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};