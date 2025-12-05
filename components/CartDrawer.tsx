import React, { useState, useEffect, useRef } from 'react';
import { X, Trash2, ArrowLeft, CheckCircle, CreditCard, Banknote, Globe, Lock } from 'lucide-react';
import { CartItem, Address } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: (address: Address, paymentMethod: string) => void;
}

type PaymentCategory = 'online' | 'manual' | 'cod';
type OnlineMethod = 'stripe' | 'payoneer';
type ManualProvider = 'Wise' | 'Western Union';

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cartItems, onRemove, onCheckout }) => {
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  
  // Payment State
  const [paymentCategory, setPaymentCategory] = useState<PaymentCategory>('online');
  const [onlineMethod, setOnlineMethod] = useState<OnlineMethod>('stripe');
  const [manualProvider, setManualProvider] = useState<ManualProvider>('Wise');
  const [payoneerEmail, setPayoneerEmail] = useState('');
  
  // Stripe State
  const [stripe, setStripe] = useState<any>(null);
  const [elements, setElements] = useState<any>(null);
  const [cardError, setCardError] = useState<string>('');
  
  // Refs
  const stripeCardRef = useRef<any>(null); // Track the Stripe Card Element instance

  const [formData, setFormData] = useState<Address>({
    fullName: '',
    email: '',
    addressLine1: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Initialize Stripe Object (Once)
  useEffect(() => {
    if ((window as any).Stripe && !stripe) {
      const s = (window as any).Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
      setStripe(s);
      setElements(s.elements());
    }
  }, [stripe]);

  // Manage Stripe Card Element Lifecycle
  useEffect(() => {
    // Only proceed if we are in checkout, online mode, stripe selected, and SDK is ready
    if (step === 'checkout' && paymentCategory === 'online' && onlineMethod === 'stripe' && elements) {
      
      const mountStripeCard = () => {
        const container = document.getElementById('card-element');
        if (container) {
          // Check if we already created a card, if not, create it
          if (!stripeCardRef.current) {
            stripeCardRef.current = elements.create('card', {
              style: {
                base: {
                  color: '#32325d',
                  fontFamily: '"Inter", sans-serif',
                  fontSmoothing: 'antialiased',
                  fontSize: '16px',
                  '::placeholder': { color: '#aab7c4' }
                },
                invalid: { color: '#fa755a', iconColor: '#fa755a' }
              }
            });
          }

          // Mount the card to the DOM
          try {
             stripeCardRef.current.mount('#card-element');
             stripeCardRef.current.on('change', (event: any) => {
               setCardError(event.error ? event.error.message : '');
             });
          } catch (err) {
            console.error("Stripe Mount Error:", err);
          }
        }
      };

      // Slight delay to ensure DOM is rendered
      const timeoutId = setTimeout(mountStripeCard, 100);

      return () => {
        clearTimeout(timeoutId);
        // Unmount the card when this view is hidden to prevent "Can only create one Element" errors
        if (stripeCardRef.current) {
            try {
                stripeCardRef.current.unmount();
            } catch (e) {
                // Ignore unmount errors if already unmounted
            }
        }
      };
    }
  }, [step, paymentCategory, onlineMethod, elements]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateAddress = () => {
    const isAddressComplete = Object.values(formData).every((val) => (val as string).trim() !== '');
    if (!isAddressComplete) {
      alert("Please fill in all shipping details.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAddress()) return;

    if (paymentCategory === 'online') {
        if (onlineMethod === 'stripe') {
            if (!stripe || !elements || !stripeCardRef.current) return;
            
            // Simulate processing
            const { error, token } = await stripe.createToken(stripeCardRef.current);
            
            if (error) {
                setCardError(error.message);
            } else {
                console.log("Stripe Token Generated:", token);
                handleFinalCheckout('Credit Card (Stripe)');
            }
            return;
        } else if (onlineMethod === 'payoneer') {
            if (!payoneerEmail.trim()) {
                alert("Please enter your Payoneer email address.");
                return;
            }
            // Simulate Payoneer Redirect/Checkout
            handleFinalCheckout(`Payoneer (${payoneerEmail})`);
            return;
        }
    }

    if (paymentCategory === 'manual') {
        handleFinalCheckout(`Manual: ${manualProvider}`);
        return;
    }

    if (paymentCategory === 'cod') {
        handleFinalCheckout('Cash on Delivery');
        return;
    }
  };

  const handleFinalCheckout = (methodDescription: string) => {
    onCheckout(formData, methodDescription);
    // Reset
    setTimeout(() => {
        setStep('cart');
        setPaymentCategory('online');
        setOnlineMethod('stripe');
        setPayoneerEmail('');
    }, 500);
  }

  // Determine button text
  const getButtonText = () => {
    if (paymentCategory === 'online') {
        if (onlineMethod === 'stripe') return `Pay $${total.toFixed(2)}`;
        if (onlineMethod === 'payoneer') return 'Proceed to Payoneer';
    }
    return 'Place Order';
  };

  if (!isOpen) return null;

  return (
    <div className="relative z-50">
      <div className="fixed inset-0 bg-black/50 transition-opacity backdrop-blur-sm" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10">
        <div className="w-screen max-w-md transform transition-transform duration-500 bg-white shadow-xl flex flex-col h-full">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 border-b border-gray-200 bg-white z-10">
            <div className="flex items-center gap-2">
              {step === 'checkout' && (
                <button onClick={() => setStep('cart')} className="text-gray-500 hover:text-slate-900">
                  <ArrowLeft size={20} />
                </button>
              )}
              <h2 className="text-lg font-bold text-gray-900">
                {step === 'cart' ? 'Shopping Cart' : 'Checkout'}
              </h2>
            </div>
            <button type="button" className="text-gray-400 hover:text-gray-500" onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          {step === 'cart' ? (
            <>
              {/* Cart Items View */}
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-20 text-gray-500">
                    <p className="mb-4">Your cart is empty.</p>
                    <button onClick={onClose} className="text-accent font-bold hover:underline">Start Shopping</button>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <li key={`${item.id}-${item.selectedSize}`} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="h-full w-full object-cover object-center"
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = "https://placehold.co/600x800/f1f5f9/94a3b8?text=Image+Unavailable";
                            }}
                          />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3 className="line-clamp-1 mr-2">{item.name}</h3>
                              <p>${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Size: {item.selectedSize}</p>
                            <p className="text-sm text-gray-500">{item.subCategory}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">Qty {item.quantity}</p>
                            <button
                              type="button"
                              onClick={() => onRemove(item.id)}
                              className="font-medium text-red-500 hover:text-red-700 flex items-center gap-1"
                            >
                              <Trash2 size={14} /> Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Cart Footer */}
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6 bg-gray-50">
                <div className="flex justify-between text-base font-bold text-gray-900 mb-4">
                  <p>Subtotal</p>
                  <p>${total.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => setStep('checkout')}
                  disabled={cartItems.length === 0}
                  className={`w-full flex items-center justify-center rounded-lg border border-transparent px-6 py-4 text-base font-bold text-white shadow-md transition-all ${cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-800 active:scale-95'}`}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Checkout Form View */}
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 bg-gray-50/50">
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Shipping Address Section */}
                  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2">
                        <Globe size={16} /> Shipping Details
                    </h3>
                    <div className="space-y-3">
                        <input name="fullName" required className="w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-slate-900 outline-none" placeholder="Full Name" onChange={handleInputChange} />
                        <input name="email" type="email" required className="w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-slate-900 outline-none" placeholder="Email Address" onChange={handleInputChange} />
                        <input name="addressLine1" required className="w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-slate-900 outline-none" placeholder="Street Address" onChange={handleInputChange} />
                        <div className="grid grid-cols-2 gap-3">
                            <input name="city" required className="w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-slate-900 outline-none" placeholder="City" onChange={handleInputChange} />
                            <input name="state" required className="w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-slate-900 outline-none" placeholder="State" onChange={handleInputChange} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <input name="zipCode" required className="w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-slate-900 outline-none" placeholder="Zip Code" onChange={handleInputChange} />
                            <select name="country" required className="w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-slate-900 outline-none bg-white" onChange={handleInputChange}>
                                <option value="">Country...</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="UK">United Kingdom</option>
                                <option value="AU">Australia</option>
                                <option value="Global">Other (International)</option>
                            </select>
                        </div>
                    </div>
                  </div>

                  {/* Payment Methods Section */}
                  <div className="space-y-4">
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider px-1">Payment Method</h3>

                      {/* 1. Online Payments */}
                      <div className={`bg-white rounded-xl border overflow-hidden transition-all ${paymentCategory === 'online' ? 'border-slate-900 ring-1 ring-slate-900' : 'border-gray-200'}`}>
                          <div 
                             className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center justify-between cursor-pointer"
                             onClick={() => setPaymentCategory('online')}
                          >
                              <div className="flex items-center gap-2">
                                  <CreditCard size={18} className="text-slate-700" />
                                  <span className="font-bold text-sm text-slate-900">Online Payment</span>
                              </div>
                              {paymentCategory === 'online' && <div className="w-2 h-2 bg-slate-900 rounded-full" />}
                          </div>
                          
                          {paymentCategory === 'online' && (
                            <div className="p-4 space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                                {/* Online Sub-Selection */}
                                <div className="flex gap-2">
                                    <button 
                                        type="button"
                                        onClick={() => setOnlineMethod('stripe')}
                                        className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 transition-all ${onlineMethod === 'stripe' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                                    >
                                        <CreditCard size={16} /> Card
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setOnlineMethod('payoneer')}
                                        className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 transition-all ${onlineMethod === 'payoneer' ? 'bg-[#FF4800] text-white border-[#FF4800]' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                                    >
                                        <span className="font-bold">Payoneer</span>
                                    </button>
                                </div>

                                {/* Stripe Form */}
                                {onlineMethod === 'stripe' && (
                                    <div className="mt-4">
                                        <div className="p-3 border border-gray-300 rounded-md bg-white">
                                            <div id="card-element" className="py-1"></div>
                                        </div>
                                        {cardError && <p className="text-red-500 text-xs mt-2">{cardError}</p>}
                                        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                                            <Lock size={12} /> Encrypted by Stripe
                                        </div>
                                    </div>
                                )}

                                {/* Payoneer Content */}
                                {onlineMethod === 'payoneer' && (
                                    <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                                        <div className="flex items-center gap-2 mb-4">
                                             <div className="h-6 w-auto flex items-center justify-center bg-[#FF4800] text-white px-2 font-bold rounded text-xs">
                                                Payoneer
                                             </div>
                                             <span className="text-sm font-semibold text-gray-700">Account Integration</span>
                                        </div>
                                        
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Payoneer Email</label>
                                        <input 
                                            type="email"
                                            required={paymentCategory === 'online' && onlineMethod === 'payoneer'}
                                            value={payoneerEmail}
                                            onChange={(e) => setPayoneerEmail(e.target.value)}
                                            className="w-full p-2 text-sm border border-gray-300 rounded-md outline-none focus:border-[#FF4800] focus:ring-1 focus:ring-[#FF4800] transition-all"
                                            placeholder="email@example.com"
                                        />
                                        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                                            <Lock size={10} /> 
                                            Redirects to Payoneer secure portal
                                        </p>
                                    </div>
                                )}
                            </div>
                          )}
                      </div>

                      {/* 2. Manual Payments */}
                      <div className={`bg-white rounded-xl border overflow-hidden transition-all ${paymentCategory === 'manual' ? 'border-slate-900 ring-1 ring-slate-900' : 'border-gray-200'}`}>
                          <div 
                             className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center justify-between cursor-pointer"
                             onClick={() => setPaymentCategory('manual')}
                          >
                              <div className="flex items-center gap-2">
                                  <Globe size={18} className="text-slate-700" />
                                  <span className="font-bold text-sm text-slate-900">Manual Payment</span>
                              </div>
                              {paymentCategory === 'manual' && <div className="w-2 h-2 bg-slate-900 rounded-full" />}
                          </div>
                          
                          {paymentCategory === 'manual' && (
                             <div className="p-4 animate-in fade-in slide-in-from-top-1 duration-200">
                                 <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Select Provider</label>
                                 <select 
                                    className="w-full p-2 text-sm border border-gray-300 rounded-md mb-3 outline-none"
                                    value={manualProvider}
                                    onChange={(e) => setManualProvider(e.target.value as ManualProvider)}
                                 >
                                     <option value="Wise">Wise (TransferWise)</option>
                                     <option value="Western Union">Western Union</option>
                                 </select>
                                 <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 text-sm text-orange-800">
                                     <p className="font-bold mb-1">Instruction:</p>
                                     After placing the order, you will receive specific payment details for {manualProvider} via WhatsApp or Email within 24 hours.
                                 </div>
                             </div>
                          )}
                      </div>

                      {/* 3. Cash on Delivery */}
                      <div className={`bg-white rounded-xl border overflow-hidden transition-all ${paymentCategory === 'cod' ? 'border-slate-900 ring-1 ring-slate-900' : 'border-gray-200'}`}>
                          <div 
                             className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center justify-between cursor-pointer"
                             onClick={() => setPaymentCategory('cod')}
                          >
                              <div className="flex items-center gap-2">
                                  <Banknote size={18} className="text-green-600" />
                                  <span className="font-bold text-sm text-slate-900">Cash On Delivery</span>
                              </div>
                              {paymentCategory === 'cod' && <div className="w-2 h-2 bg-slate-900 rounded-full" />}
                          </div>
                          
                          {paymentCategory === 'cod' && (
                              <div className="p-4 text-sm text-gray-600 animate-in fade-in slide-in-from-top-1 duration-200">
                                  Pay directly to the courier when your order arrives. Available for select locations.
                              </div>
                          )}
                      </div>

                  </div>
                </form>
              </div>

              {/* Checkout Footer */}
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6 bg-white shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-10">
                 <div className="flex justify-between text-base font-bold text-gray-900 mb-4">
                  <p>Total Amount</p>
                  <p>${total.toFixed(2)}</p>
                </div>
                
                <button
                type="submit"
                form="checkout-form"
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-transparent px-6 py-4 text-base font-bold text-white shadow-md bg-slate-900 hover:bg-slate-800 transition-all active:scale-95"
                >
                <CheckCircle size={20} />
                {getButtonText()}
                </button>
                
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};