import React from 'react';
import { HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const faqs = [
    {
      q: "How long does shipping take?",
      a: "Since we fulfill orders manually to ensure quality, shipping typically takes 2-4 weeks depending on your location. We provide tracking numbers for all orders."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept PayPal, Payoneer, Wise (TransferWise), and Western Union. All payments are secured."
    },
    {
      q: "Can I return an item?",
      a: "Yes! If you are not satisfied with your purchase, please contact us within 7 days of receiving your order. The item must be unused and in its original packaging."
    },
    {
      q: "How do I choose the right size?",
      a: "We recommend checking the size guide on each product page. Since sizes can vary by style, we often suggest ordering one size up for a comfortable fit if you are unsure."
    },
    {
      q: "Do you ship internationally?",
      a: "Yes, we ship to over 100 countries worldwide. Shipping costs will be calculated at checkout based on your delivery address."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 min-h-screen">
      <div className="text-center mb-12">
        <div className="inline-block p-3 bg-orange-100 rounded-full text-orange-600 mb-4">
          <HelpCircle size={32} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h1>
      </div>

      <div className="space-y-6">
        {faqs.map((item, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-slate-900 mb-2">{item.q}</h3>
            <p className="text-gray-600 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};