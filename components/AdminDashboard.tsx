import React, { useState } from 'react';
import { Order, Product } from '../types';
import { PRODUCTS } from '../constants';
import { Package, TrendingUp, DollarSign, Copy, Shirt, Search } from 'lucide-react';

interface AdminDashboardProps {
  orders: Order[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ orders }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory'>('orders');
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Address copied to clipboard!");
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null; // Prevent infinite loop
    e.currentTarget.src = "https://placehold.co/600x800/f1f5f9/94a3b8?text=Image+Unavailable";
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-24 min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">Manage your manual dropshipping business</p>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'orders' ? 'bg-slate-900 text-white shadow' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Orders
          </button>
          <button 
             onClick={() => setActiveTab('inventory')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'inventory' ? 'bg-slate-900 text-white shadow' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Inventory
          </button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-slate-900">${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full text-green-600"><DollarSign size={24} /></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-2xl font-bold text-slate-900">{orders.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full text-blue-600"><Package size={24} /></div>
        </div>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">Pending Fulfillment</p>
                <p className="text-2xl font-bold text-slate-900">{pendingOrders}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full text-orange-600"><TrendingUp size={24} /></div>
        </div>
      </div>

      {activeTab === 'orders' ? (
        <>
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            Recent Orders 
            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">{orders.length}</span>
          </h2>
          <div className="space-y-4">
            {orders.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center text-gray-500 border border-dashed border-gray-300">
                  <Package className="mx-auto mb-4 text-gray-300" size={48} />
                  <p>No orders yet. Waiting for sales!</p>
                </div>
            ) : (
                orders.map(order => (
                    <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        {/* Order Header */}
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                            <div className="flex items-center gap-4">
                                <span className="font-mono font-bold text-slate-900">#{order.id}</span>
                                <span className="text-sm text-gray-500">{order.date}</span>
                                <span className={`px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-full ${
                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                }`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="font-bold text-slate-900 text-lg">${order.total.toFixed(2)}</div>
                        </div>

                        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Fulfillment Details (Address) */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Shipping Details (For AliExpress)</h3>
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 relative group">
                                    <button 
                                      onClick={() => copyToClipboard(`${order.shippingAddress.fullName}\n${order.shippingAddress.addressLine1}\n${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}\n${order.shippingAddress.country}`)}
                                      className="absolute top-2 right-2 p-2 bg-white rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 text-gray-600"
                                      title="Copy Address"
                                    >
                                      <Copy size={16} />
                                    </button>
                                    <p className="font-bold text-slate-900">{order.shippingAddress.fullName}</p>
                                    <p className="text-sm text-gray-600 mt-1">{order.shippingAddress.addressLine1}</p>
                                    <p className="text-sm text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                                    <p className="text-sm text-gray-600 font-medium">{order.shippingAddress.country}</p>
                                    <p className="text-xs text-blue-600 mt-2">{order.shippingAddress.email}</p>
                                </div>
                                <div className="mt-4">
                                  <p className="text-xs text-gray-500 mb-1">Payment Method</p>
                                  <p className="text-sm font-medium text-slate-900">{order.paymentMethod}</p>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Items to Order</h3>
                                <div className="space-y-3">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                                            <img 
                                              src={item.imageUrl} 
                                              alt="" 
                                              className="w-10 h-10 rounded object-cover bg-gray-200"
                                              onError={handleImageError}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-slate-900 truncate">{item.name}</p>
                                                <p className="text-xs text-gray-500">Size: <span className="font-bold">{item.selectedSize}</span> • Qty: {item.quantity}</p>
                                            </div>
                                            <p className="text-sm font-medium text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                                
                                {order.status === 'pending' && (
                                    <button className="w-full mt-6 bg-slate-900 text-white py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors">
                                        Mark as Shipped
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            )}
          </div>
        </>
      ) : (
        <>
           {/* Inventory View */}
           <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-slate-900">Product Inventory</h2>
              <div className="relative">
                 <input type="text" placeholder="Search..." className="pl-8 pr-4 py-1.5 text-sm border border-gray-300 rounded-md outline-none focus:border-slate-900" />
                 <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
              </div>
           </div>
           
           <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
             <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                   <thead className="bg-gray-50">
                      <tr>
                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Status</th>
                      </tr>
                   </thead>
                   <tbody className="bg-white divide-y divide-gray-200">
                      {PRODUCTS.map(product => (
                         <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                               <div className="flex items-center">
                                  <div className="h-10 w-10 flex-shrink-0">
                                     <img 
                                        className="h-10 w-10 rounded-full object-cover bg-gray-200" 
                                        src={product.imageUrl} 
                                        alt=""
                                        onError={handleImageError} 
                                     />
                                  </div>
                                  <div className="ml-4">
                                     <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                     <div className="text-xs text-gray-500">ID: {product.id}</div>
                                  </div>
                               </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                               {product.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                               ${product.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                               <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  In Stock
                               </span>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
           </div>
        </>
      )}

      {/* Fulfillment Tip */}
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
        <div className="bg-yellow-100 p-2 rounded-full text-yellow-700 shrink-0">
            <Copy size={16} />
        </div>
        <div>
            <h3 className="text-sm font-bold text-yellow-900">Manual Fulfillment Tip</h3>
            <p className="text-sm text-yellow-800 mt-1">
                Copy the customer's shipping address from the "Shipping Details" card and paste it directly into AliExpress when placing the order. Keep the profit margin!
            </p>
        </div>
      </div>
    </div>
  );
};