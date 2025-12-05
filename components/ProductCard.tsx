import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { ShoppingBag, Eye, Sparkles, Loader } from 'lucide-react';
import { generateProductImage } from '../services/geminiService';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
  onProductClick?: (product: Product) => void;
  fallbackImage?: string;
}

// Default fallback with "Image Unavailable" text embedded
const DEFAULT_FALLBACK_IMAGE = "https://placehold.co/600x800/f1f5f9/94a3b8?text=Image+Unavailable";

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onProductClick,
  fallbackImage = DEFAULT_FALLBACK_IMAGE 
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [imgSrc, setImgSrc] = useState<string>(product.imageUrl);
  const [hasError, setHasError] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Reset state when product changes
  useEffect(() => {
    setImgSrc(product.imageUrl);
    setHasError(false);
  }, [product.imageUrl]);

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking buttons/selectors
    if ((e.target as HTMLElement).closest('button')) return;
    if (onProductClick) onProductClick(product);
  };

  const handleImageError = () => {
    setHasError(true);
  };

  const handleGenerateImage = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsGenerating(true);
    const newImage = await generateProductImage(product.name);
    if (newImage) {
        setImgSrc(newImage);
        setHasError(false);
    }
    setIsGenerating(false);
  };

  return (
    <div 
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 flex items-center justify-center">
        {!hasError ? (
            <img
            key={imgSrc} // Force re-render if src changes
            src={imgSrc}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
            onError={handleImageError}
            loading="lazy"
            />
        ) : (
            <div className="relative w-full h-full bg-gray-50 flex items-center justify-center overflow-hidden">
                <img 
                    src={fallbackImage} 
                    alt="Image Unavailable" 
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                    loading="lazy"
                />
                 {/* AI Regenerate Button Overlay in Error State */}
                 <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                    <button
                        onClick={handleGenerateImage}
                        disabled={isGenerating}
                        className="bg-white/90 backdrop-blur text-slate-900 px-4 py-2 rounded-full font-bold text-xs shadow-lg flex items-center gap-2 hover:bg-white hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed z-20"
                    >
                        {isGenerating ? <Loader size={14} className="animate-spin" /> : <Sparkles size={14} className="text-purple-600" />}
                        {isGenerating ? 'Regenerating...' : 'AI Regenerate Image'}
                    </button>
                 </div>
            </div>
        )}
        
        {/* Overlay Actions - Only show if image loaded successfully (no error) */}
        {!hasError && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center duration-300">
             <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                <button className="bg-white/90 text-slate-900 px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 shadow-lg backdrop-blur-sm pointer-events-none">
                    <Eye size={16} /> View Details
                </button>
             </div>
          </div>
        )}
        
        {/* Badges */}
        {product.isWinterSpecial && (
          <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm shadow-sm z-10">
            Winter Special
          </span>
        )}

        {product.originalPrice && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow-sm z-10">
            Sale
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="mb-2">
          <p className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">{product.subCategory}</p>
          <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug min-h-[2.5em]" title={product.name}>
            {product.name}
          </h3>
        </div>

        <div className="mt-auto mb-4 flex items-baseline gap-2">
          <span className="text-lg font-bold text-slate-900">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Size Selector */}
        <div className="mt-auto space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                className={`
                  h-8 min-w-[32px] px-1 text-xs font-bold rounded border transition-all duration-200
                  ${selectedSize === size 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-slate-900'
                  }
                `}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(product, selectedSize); }}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-md active:scale-95 group-hover:bg-orange-600 group-hover:shadow-xl group-hover:-translate-y-1"
          >
            <ShoppingBag size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};