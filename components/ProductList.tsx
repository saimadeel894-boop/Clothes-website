
import React, { useState, useMemo } from 'react';
import { Product, Category } from '../types';
import { SlidersHorizontal, ChevronDown, X, ArrowUpDown, Tag } from 'lucide-react';
import { ProductGrid } from './ProductGrid';

interface ProductListProps {
  products: Product[];
  category: Category;
  onAddToCart: (product: Product, size: string) => void;
  onProductClick: (product: Product) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

export const ProductList: React.FC<ProductListProps> = ({ products, category, onAddToCart, onProductClick }) => {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [filterSubCat, setFilterSubCat] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  // 1. Filter by Category (Base)
  const categoryProducts = useMemo(() => 
    products.filter(p => p.category === category), 
  [products, category]);

  // 2. Extract available subcategories dynamically
  const subCategories = useMemo(() => 
    Array.from(new Set(categoryProducts.map(p => p.subCategory))).sort(),
  [categoryProducts]);

  // 3. Process Products (Filter & Sort)
  const displayProducts = useMemo(() => {
    let result = [...categoryProducts];

    // Filter
    if (filterSubCat !== 'all') {
      result = result.filter(p => p.subCategory === filterSubCat);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Assuming higher ID is newer for this mock data, or just reverse original order
        result.reverse(); 
        break;
      default:
        // 'featured' keeps original order
        break;
    }

    return result;
  }, [categoryProducts, filterSubCat, sortBy]);

  // Dynamic Titles based on Category
  const categoryInfo: Record<string, { title: string; subtitle: string }> = {
    'men': {
      title: 'Young Men (18+)',
      subtitle: 'Premium winter essentials tailored for the modern man.'
    },
    'women': {
      title: 'Young Women (18+)',
      subtitle: 'Chic, cozy, and trending styles for the season.'
    },
    'kids': {
      title: 'Kids Collection',
      subtitle: 'Durable, warm, and fun clothing for ages 4-12.'
    }
  };

  const info = categoryInfo[category] || { title: 'Collection', subtitle: 'Explore our latest arrivals' };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            {info.title}
          </h1>
          <p className="mt-2 text-gray-500 text-sm md:text-base max-w-2xl">
            {info.subtitle}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
           <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors shadow-sm ${showFilters ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
          >
            <SlidersHorizontal size={16} />
            {showFilters ? 'Hide Filters' : 'Filter & Sort'}
            {(filterSubCat !== 'all' || sortBy !== 'featured') && (
               <span className="flex h-2 w-2 rounded-full bg-accent"></span>
            )}
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      {showFilters && (
        <div className="mb-8 p-4 bg-white rounded-xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Sort Options */}
                <div className="flex-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block flex items-center gap-1">
                        <ArrowUpDown size={12} /> Sort By
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { id: 'featured', label: 'Featured' },
                            { id: 'newest', label: 'New Arrivals' },
                            { id: 'price-asc', label: 'Price: Low to High' },
                            { id: 'price-desc', label: 'Price: High to Low' },
                        ].map(opt => (
                            <button
                                key={opt.id}
                                onClick={() => setSortBy(opt.id as SortOption)}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${sortBy === opt.id ? 'bg-slate-100 border-slate-900 text-slate-900' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filter Options */}
                <div className="flex-1">
                     <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block flex items-center gap-1">
                        <Tag size={12} /> Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setFilterSubCat('all')}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${filterSubCat === 'all' ? 'bg-slate-100 border-slate-900 text-slate-900' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                        >
                            All
                        </button>
                        {subCategories.map(cat => (
                             <button
                                key={cat}
                                onClick={() => setFilterSubCat(cat)}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${filterSubCat === cat ? 'bg-slate-100 border-slate-900 text-slate-900' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Active Filters Display */}
            {(filterSubCat !== 'all' || sortBy !== 'featured') && (
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                        Showing {displayProducts.length} results
                    </span>
                    <button 
                        onClick={() => { setSortBy('featured'); setFilterSubCat('all'); }}
                        className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1"
                    >
                        <X size={12} /> Clear All
                    </button>
                </div>
            )}
        </div>
      )}

      {/* Product Grid */}
      <ProductGrid 
        products={displayProducts} 
        onAddToCart={onAddToCart} 
        onProductClick={onProductClick}
      />
      
      {/* Empty State */}
      {displayProducts.length === 0 && (
        <div className="text-center py-32 bg-white rounded-xl border border-dashed border-gray-200">
            <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400">
                <SlidersHorizontal size={24} />
            </div>
          <h3 className="text-lg font-bold text-slate-900">No products found</h3>
          <p className="text-gray-500 text-sm mt-1">Try changing your filters or sorting options.</p>
          <button 
            onClick={() => { setSortBy('featured'); setFilterSubCat('all'); }}
            className="mt-4 text-accent font-bold text-sm hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
