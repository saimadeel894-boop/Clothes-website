export type Category = 'men' | 'women' | 'kids';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: Category;
  subCategory: string; // e.g., 'Hoodie', 'Jacket'
  imageUrl: string;
  isWinterSpecial: boolean;
  description: string;
  sizes: string[]; // Added sizes array
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export interface Address {
  fullName: string;
  email: string;
  addressLine1: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'shipped' | 'delivered';
  customerName: string;
  paymentMethod: string;
  shippingAddress: Address; // Critical for manual fulfillment
}