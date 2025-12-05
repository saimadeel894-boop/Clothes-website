import React, { useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { Star, Truck, ShieldCheck, ArrowLeft, Minus, Plus, Share2, Sparkles, X, Loader, RefreshCw } from 'lucide-react';
import { ProductGrid } from './ProductGrid';
import { editProductImage } from '../services/geminiService';

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onBack: () => void;
  onNavigateProduct: (product: Product) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  relatedProducts, 
  onAddToCart, 
  onBack,
  onNavigateProduct 
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const [imageError, setImageError] = useState(false);
  
  // AI Edit State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Reset state when product changes
  useEffect(() => {
    setSelectedSize(product.sizes[0] || 'M');
    setQuantity(1);
    setImageError(false);
    handleResetAi();
  }, [product]);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, quantity);
  };

  const handleAiGenerate = async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    const result = await editProductImage(product.imageUrl, aiPrompt);
    if (result) {
        setGeneratedImage(result);
    } else {
        alert("Failed to generate image. Please try again or check your API key.");
    }
    setIsGenerating(false);
  };

  const handleResetAi = () => {
      setGeneratedImage(null);
      setAiPrompt('');
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Breadcrumb / Back */}
      <div className="max-w-7xl mx-auto px-4 py-4 border-b border-gray-100 mb-6 flex items-center gap-2">
        <button onClick={onBack} className="text-gray-500 hover:text-slate-900 flex items-center gap-1 text-sm font-medium">
          <ArrowLeft size={16} /> Back to Shop
        </button>
        <span className="text-gray-300">/</span>
        <span className="text-gray-400 text-sm capitalize">{product.category}</span>
        <span className="text-gray-300">/</span>
        <span className="text-slate-900 text-sm font-medium truncate max-w-[200px]">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 relative group">
              {!imageError ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <img 
                  src="https://placehold.co/600x800/f1f5f9/94a3b8?text=Image+Unavailable"
                  alt="Image Unavailable"
                  className="w-full h-full object-cover opacity-90"
                />
              )}

              {product.isWinterSpecial && (
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider">
                  Winter Ready
                </div>
              )}
              
              {/* AI Edit Trigger - Only show if image loaded successfully */}
              {!imageError && (
                <button 
                  onClick={() => setIsAiModalOpen(true)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur text-slate-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm flex items-center gap-1 hover:bg-white hover:scale-105 transition-all z-10"
                >
                  <Sparkles size={14} className="text-purple-600" />
                  AI Edit
                </button>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <span className="text-sm text-gray-500">(128 reviews)</span>
            </div>

            <div className="flex items-end gap-3 mb-8">
              <span className="text-3xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through mb-1">${product.originalPrice.toFixed(2)}</span>
              )}
              {product.originalPrice && (
                 <span className="text-sm font-bold text-red-500 mb-1.5 ml-1">
                   Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                 </span>
              )}
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Select Size</span>
                <button className="text-sm text-gray-500 underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      w-12 h-12 flex items-center justify-center rounded-lg border font-medium transition-all
                      ${selectedSize === size 
                        ? 'bg-slate-900 text-white border-slate-900' 
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-900'
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <span className="text-sm font-medium text-gray-900 block mb-2">Quantity</span>
              <div className="flex items-center w-32 border border-gray-300 rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                >
                  <Minus size={16} />
                </button>
                <div className="flex-1 text-center font-medium text-gray-900">{quantity}</div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors shadow-lg active:scale-95"
              >
                Add to Cart
              </button>
              <button className="w-14 flex items-center justify-center border border-gray-300 rounded-xl hover:bg-gray-50 text-gray-600">
                <Share2 size={24} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-2 gap-4 mb-8 border border-gray-100">
              <div className="flex items-center gap-3">
                <Truck className="text-slate-900" size={24} />
                <div>
                  <p className="text-sm font-bold text-slate-900">Free Shipping</p>
                  <p className="text-xs text-gray-500">On orders over $75</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-slate-900" size={24} />
                <div>
                  <p className="text-sm font-bold text-slate-900">Secure Payment</p>
                  <p className="text-xs text-gray-500">Encrypted checkout</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-200">
              <div className="flex gap-8 border-b border-gray-200">
                <button 
                  onClick={() => setActiveTab('description')}
                  className={`py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'description' ? 'border-slate-900 text-slate-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Description
                </button>
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className={`py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'reviews' ? 'border-slate-900 text-slate-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Reviews (128)
                </button>
              </div>
              <div className="py-6">
                {activeTab === 'description' ? (
                  <div className="prose prose-sm text-gray-600 leading-relaxed">
                    <p>{product.description}</p>
                    <ul className="list-disc pl-4 mt-4 space-y-2">
                      <li>Premium quality fabric optimized for comfort.</li>
                      <li>Durable stitching designed for long-lasting wear.</li>
                      <li>Perfect for {product.isWinterSpecial ? 'winter cold' : 'everyday style'}.</li>
                      <li>Machine washable.</li>
                    </ul>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Fake Reviews */}
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">Happy Customer</span>
                            <span className="text-green-600 text-xs bg-green-50 px-2 py-0.5 rounded-full">Verified Buyer</span>
                          </div>
                          <span className="text-xs text-gray-400">2 days ago</span>
                        </div>
                        <div className="flex text-yellow-400 mb-2">
                          {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                        </div>
                        <p className="text-sm text-gray-600">
                          Absolutely love this item! The quality is amazing for the price and it fits perfectly. Will definitely be ordering more soon.
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20 border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">You May Also Like</h2>
          <ProductGrid 
            products={relatedProducts} 
            onAddToCart={(p, s) => onAddToCart(p, s, 1)} 
            onProductClick={onNavigateProduct}
          />
        </div>

      </div>

      {/* AI Edit Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <Sparkles size={18} className="text-purple-600" />
                        AI Image Editor <span className="text-xs font-normal text-gray-500">(Gemini 2.5 Flash)</span>
                    </h3>
                    <button onClick={() => setIsAiModalOpen(false)}><X size={24} className="text-gray-400 hover:text-gray-600" /></button>
                </div>
                
                <div className="p-6 flex-1 overflow-y-auto">
                    <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden relative mb-6 border border-gray-200">
                        <img 
                            src={generatedImage || product.imageUrl} 
                            className="w-full h-full object-contain" 
                            alt="Editing preview" 
                        />
                        {isGenerating && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                                <div className="flex flex-col items-center">
                                    <Loader size={32} className="animate-spin text-slate-900 mb-2" />
                                    <span className="text-sm font-bold text-slate-900 animate-pulse">Generating Magic...</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAiGenerate()}
                            placeholder="E.g., Add a retro filter, Make it a sketch, Remove background..." 
                            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all"
                        />
                        <button 
                            onClick={handleAiGenerate}
                            disabled={isGenerating || !aiPrompt}
                            className="bg-slate-900 text-white px-6 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shadow-sm"
                        >
                            {generatedImage ? <RefreshCw size={18} /> : <Sparkles size={18} />}
                            {generatedImage ? 'Retry' : 'Generate'}
                        </button>
                    </div>
                    {generatedImage && (
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-xs text-gray-500">* AI generated preview. Results may vary.</p>
                            <button onClick={handleResetAi} className="text-xs font-medium text-red-500 hover:text-red-700 underline">
                                Reset to Original
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};