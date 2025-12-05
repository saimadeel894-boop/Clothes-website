import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { ProductList } from './components/ProductList';
import { ProductGrid } from './components/ProductGrid';
import { PromoBanner } from './components/PromoBanner';
import { Newsletter } from './components/Newsletter';
import { CartDrawer } from './components/CartDrawer';
import { AdminDashboard } from './components/AdminDashboard';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { FAQ } from './components/FAQ';
import { LegalPage } from './components/LegalPages';
import { ProductDetail } from './components/ProductDetail';
import { ChatAssistant } from './components/ChatAssistant';
import { AiStudio } from './components/AiStudio';
import { PRODUCTS } from './constants';
import { Category, Product, CartItem, Order, Address } from './types';
import { User, Phone, MapPin, Truck, ShieldCheck, CreditCard, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('home');
  const [currentCategory, setCurrentCategory] = useState<Category>('men');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Order State (Mock Backend)
  const [orders, setOrders] = useState<Order[]>([]);

  // Navigation Handler
  const handleNavigate = (page: string, category?: Category) => {
    setCurrentPage(page);
    if (category) setCurrentCategory(category);
    // Reset product selection when navigating main pages
    if (page !== 'product-detail') setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo(0, 0);
  };

  // Cart Actions
  const addToCart = (product: Product, size: string, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(p => p.id === product.id && p.selectedSize === size);
      if (existing) {
        return prev.map(p => p.id === product.id && p.selectedSize === size ? { ...p, quantity: p.quantity + quantity } : p);
      }
      return [...prev, { ...product, quantity, selectedSize: size }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(p => p.id !== id));
  };

  const handleCheckout = (address: Address, paymentMethod: string) => {
    // Simulate Order Placement with actual address
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      items: [...cartItems],
      total: cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0),
      date: new Date().toLocaleDateString(),
      status: 'pending',
      customerName: address.fullName,
      shippingAddress: address,
      paymentMethod: paymentMethod
    };

    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    setIsCartOpen(false);
    
    // Show confirmation (could be a separate page, but alert is fine for demo)
    alert(`Order Placed Successfully! \n\nCheck the Admin Dashboard to fulfill Order #${newOrder.id} for ${address.fullName}.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Header 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onNavigate={handleNavigate}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} />
            
            {/* Trust Badges */}
            <div className="py-8 bg-white border-y border-gray-100">
               <div className="max-w-7xl mx-auto px-4">
                   <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                       <div className="flex flex-col items-center p-4">
                           <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3 text-blue-600">
                               <Truck size={24} />
                           </div>
                           <h4 className="font-bold text-sm text-slate-900">Free Shipping</h4>
                           <p className="text-xs text-gray-500 mt-1">On orders over $75</p>
                       </div>
                       <div className="flex flex-col items-center p-4">
                            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-3 text-green-600">
                               <ShieldCheck size={24} />
                           </div>
                           <h4 className="font-bold text-sm text-slate-900">Secure Payment</h4>
                           <p className="text-xs text-gray-500 mt-1">100% secure checkout</p>
                       </div>
                       <div className="flex flex-col items-center p-4">
                            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-3 text-orange-600">
                               <Phone size={24} />
                           </div>
                           <h4 className="font-bold text-sm text-slate-900">24/7 Support</h4>
                           <p className="text-xs text-gray-500 mt-1">Dedicated support</p>
                       </div>
                       <div className="flex flex-col items-center p-4">
                            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-3 text-purple-600">
                               <CreditCard size={24} />
                           </div>
                           <h4 className="font-bold text-sm text-slate-900">Money Back</h4>
                           <p className="text-xs text-gray-500 mt-1">30 days return policy</p>
                       </div>
                   </div>
               </div>
            </div>

            {/* Best Sellers Section */}
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Best Sellers</h2>
                  <p className="text-gray-500 mt-1">Top rated winter favorites</p>
                </div>
                <button onClick={() => handleNavigate('shop', 'men')} className="text-sm font-medium text-slate-900 hover:text-accent flex items-center gap-1">
                  View All <ArrowRight size={16} />
                </button>
              </div>
              <ProductGrid 
                  products={PRODUCTS.filter(p => p.isWinterSpecial).slice(0, 8)} 
                  onAddToCart={(p, s) => addToCart(p, s, 1)}
                  onProductClick={handleProductClick}
              />
            </div>

            {/* Promo Banner */}
            <PromoBanner onNavigate={handleNavigate} />

            {/* New Arrivals Section */}
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">New Arrivals</h2>
                  <p className="text-gray-500 mt-1">Just in time for the season</p>
                </div>
                <button onClick={() => handleNavigate('shop', 'women')} className="text-sm font-medium text-slate-900 hover:text-accent flex items-center gap-1">
                  View All <ArrowRight size={16} />
                </button>
              </div>
              {/* Taking last 4 items (mock new arrivals) */}
              <ProductGrid 
                  products={PRODUCTS.slice().reverse().slice(0, 4)} 
                  onAddToCart={(p, s) => addToCart(p, s, 1)}
                  onProductClick={handleProductClick}
              />
            </div>

            <Newsletter />
          </>
        )}

        {currentPage === 'shop' && (
          <ProductList 
            products={PRODUCTS} 
            category={currentCategory} 
            onAddToCart={(p, s) => addToCart(p, s, 1)}
            onProductClick={handleProductClick}
          />
        )}

        {currentPage === 'product-detail' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct}
            // Simple related products logic: same category, different id
            relatedProducts={PRODUCTS.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id).slice(0, 4)}
            onAddToCart={addToCart}
            onBack={() => handleNavigate('shop', selectedProduct.category)}
            onNavigateProduct={handleProductClick}
          />
        )}

        {currentPage === 'admin' && (
          <AdminDashboard orders={orders} />
        )}

        {currentPage === 'ai-studio' && <AiStudio />}
        
        {currentPage === 'about' && <About />}
        {currentPage === 'contact' && <Contact />}
        {currentPage === 'faq' && <FAQ />}
        
        {/* Legal Pages */}
        {currentPage === 'shipping-policy' && <LegalPage type="shipping" />}
        {currentPage === 'terms-conditions' && <LegalPage type="terms" />}
        {currentPage === 'privacy-policy' && <LegalPage type="privacy" />}

      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
      
      {/* Global AI Chat Assistant */}
      <ChatAssistant />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems} 
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default App;