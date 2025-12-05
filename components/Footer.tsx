import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Ahmed<span className="text-orange-500">Hub</span></h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Your premium destination for trendy fashion. We hand-pick every item to ensure quality and style for Men, Women, and Kids.
            </p>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-orange-500 transition-colors">Contact Us</button>
              </li>
              <li>
                <button onClick={() => onNavigate('shipping-policy')} className="hover:text-orange-500 transition-colors">Shipping Policy</button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-orange-500 transition-colors">FAQ</button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <button onClick={() => onNavigate('privacy-policy')} className="hover:text-orange-500 transition-colors">Privacy Policy</button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms-conditions')} className="hover:text-orange-500 transition-colors">Terms & Conditions</button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail size={18} className="text-orange-500" />
                <span>support@ahmedhub.shop</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone size={18} className="text-orange-500" />
                <span>+1 (555) 123-4567</span>
              </div>
               <div className="flex items-center gap-3 text-sm text-gray-600">
                <MapPin size={18} className="text-orange-500" />
                <span>Global Shipping</span>
              </div>
            </div>
          </div>

        </div>
        <div className="mt-10 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} AhmedHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};