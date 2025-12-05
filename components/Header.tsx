import React, { useState } from 'react';
import { ShoppingBag, Menu, X, User, Search, Sparkles } from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  cartCount: number;
  onNavigate: (page: string, category?: Category) => void;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onNavigate, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: string, category?: Category) => {
    onNavigate(page, category);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-slate-900 text-white text-xs py-2 text-center px-4 font-medium tracking-wide">
        Free Worldwide Shipping on Orders Over $75! 🌍 ✈️
      </div>

      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNav('home')}>
              <span className="text-2xl font-bold tracking-tight text-primary">Ahmed<span className="text-accent">Hub</span></span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8 items-center">
              <button onClick={() => handleNav('home')} className="text-gray-700 hover:text-accent font-medium">Home</button>
              <button onClick={() => handleNav('shop', 'men')} className="text-gray-700 hover:text-accent font-medium">Young Men</button>
              <button onClick={() => handleNav('shop', 'women')} className="text-gray-700 hover:text-accent font-medium">Young Women</button>
              <button onClick={() => handleNav('shop', 'kids')} className="text-gray-700 hover:text-accent font-medium">Kids</button>
              <button onClick={() => handleNav('admin')} className="text-gray-500 hover:text-primary text-sm font-normal">Admin</button>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-900">
                <Search size={20} />
              </button>
              <button className="text-gray-500 hover:text-gray-900 relative" onClick={onOpenCart}>
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button className="md:hidden text-gray-500" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 pb-4">
            <div className="pt-2 px-4 space-y-1">
              <button onClick={() => handleNav('home')} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Home</button>
              <button onClick={() => handleNav('shop', 'men')} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Young Men</button>
              <button onClick={() => handleNav('shop', 'women')} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Young Women</button>
              <button onClick={() => handleNav('shop', 'kids')} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Kids</button>
              <button onClick={() => handleNav('about')} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">About Us</button>
              <button onClick={() => handleNav('admin')} className="block w-full text-left px-3 py-2 text-base font-medium text-red-500 hover:bg-red-50 rounded-md">Admin Dashboard</button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};