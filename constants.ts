
import { Product } from './types';

// High-quality Unsplash URLs for clean, modern ecommerce aesthetic
export const PRODUCTS: Product[] = [
  // --- MEN (Young Boy 18+) ---
  {
    id: 'm1',
    name: 'Premium Sherpa Lined Hoodie',
    price: 45.00,
    category: 'men',
    subCategory: 'Hoodie',
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    isWinterSpecial: true,
    description: 'Soft fleece interior, thick fabric, perfect for cold days. Stylish oversized fit.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'm2',
    name: 'Classic Puffer Jacket',
    price: 55.00,
    category: 'men',
    subCategory: 'Jacket',
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
    isWinterSpecial: true,
    description: 'Heavy winter puffer with windproof outer layer and warm padding.',
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 'm3',
    name: 'Fleece Oversized Sweatshirt',
    price: 32.00,
    category: 'men',
    subCategory: 'Sweatshirt',
    imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
    isWinterSpecial: true,
    description: 'Minimal winter sweatshirt, soft, warm, and ideal for layering.',
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'm4',
    name: 'Bomber Jacket With Thermal Lining',
    price: 48.00,
    category: 'men',
    subCategory: 'Jacket',
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
    isWinterSpecial: true,
    description: 'Streetwear style bomber jacket with insulated lining for extra warmth.',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'm5',
    name: 'Winter Knit Pullover',
    price: 28.00,
    category: 'men',
    subCategory: 'Pullover',
    imageUrl: 'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=800&q=80',
    isWinterSpecial: true,
    description: 'Comfortable winter knit, casual and easy to style.',
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 'm6',
    name: 'Winter Jogger Pants',
    price: 26.00,
    category: 'men',
    subCategory: 'Jogger Pants',
    imageUrl: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=800&q=80',
    isWinterSpecial: true,
    description: 'Soft fleece-lined joggers designed for everyday winter wear.',
    sizes: ['28', '30', '32', '34', '36']
  },
  {
    id: 'm7',
    name: 'Cargo Pants Heavy Duty',
    price: 30.00,
    category: 'men',
    subCategory: 'Cargo Pants',
    imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    isWinterSpecial: true,
    description: 'Thick cargo pants with multiple pockets and durable fabric.',
    sizes: ['30', '32', '34', '36']
  },
  {
    id: 'm8',
    name: 'Wool Blend Beanie',
    price: 12.00,
    category: 'men',
    subCategory: 'Accessories',
    imageUrl: '/images/mens_wool_beanie.png',
    isWinterSpecial: true,
    description: 'Soft wool cap, stretchable and warm for winter.',
    sizes: ['One Size']
  },

  // --- WOMEN (Young Girl 18+) ---
  {
    id: 'w1',
    name: 'Teddy Fur Zip Jacket',
    price: 38.00,
    category: 'women',
    subCategory: 'Jacket',
    imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80',
    isWinterSpecial: true,
    description: 'Ultra-soft fur texture, cozy and trending winter outerwear.',
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'w2',
    name: 'Long Winter Coat',
    price: 52.00,
    category: 'women',
    subCategory: 'Coat',
    imageUrl: 'https://images.unsplash.com/photo-1544957992-20514f595d6f?auto=format&fit=crop&w=800&q=80',
    isWinterSpecial: true,
    description: 'Elegant long coat for cold days, premium winter finish.',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'w3',
    name: 'Oversized Winter Hoodie',
    price: 32.00,
    category: 'women',
    subCategory: 'Hoodie',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    isWinterSpecial: true,
    description: 'Warm oversized hoodie designed for comfort and style.',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'w4',
    name: 'Knit Sweater Dress',
    price: 40.00,
    category: 'women',
    subCategory: 'Dress',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    isWinterSpecial: true,
    description: 'Fitted winter dress made with thick knit fabric.',
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: 'w5',
    name: 'Winter Leggings (Thermal)',
    price: 18.00,
    category: 'women',
    subCategory: 'Leggings',
    imageUrl: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80',
    isWinterSpecial: true,
    description: 'Warm thermal leggings perfect for winter outfits.',
    sizes: ['S/M', 'L/XL']
  },
  {
    id: 'w6',
    name: 'Winter Pullover Sweatshirt',
    price: 28.00,
    category: 'women',
    subCategory: 'Sweatshirt',
    imageUrl: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80',
    isWinterSpecial: true,
    description: 'Soft, trendy pullover with winter fleece interior.',
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'w7',
    name: 'Puffer Jacket for Women',
    price: 56.00,
    category: 'women',
    subCategory: 'Jacket',
    imageUrl: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    isWinterSpecial: true,
    description: 'Thick puffer jacket, windproof, warm, and stylish.',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'w8',
    name: 'Winter Handbag',
    price: 22.00,
    category: 'women',
    subCategory: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    isWinterSpecial: true,
    description: 'Minimal handbag designed to match winter outfits.',
    sizes: ['One Size']
  },

  // --- KIDS (4-12 Years) ---
  {
    id: 'k1',
    name: 'Kids Winter Hoodie Set',
    price: 25.00,
    category: 'kids',
    subCategory: 'Tracksuit',
    imageUrl: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=800&q=80',
    isWinterSpecial: true,
    description: 'Hoodie with joggers, soft fleece, perfect for boys and girls.',
    sizes: ['4Y', '6Y', '8Y', '10Y', '12Y']
  },
  {
    id: 'k2',
    name: 'Kids Puffer Jacket',
    price: 34.00,
    category: 'kids',
    subCategory: 'Jacket',
    imageUrl: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80',
    isWinterSpecial: true,
    description: 'Warm padded puffer for kids, stylish and durable.',
    sizes: ['4Y', '6Y', '8Y', '10Y', '12Y']
  },
  {
    id: 'k3',
    name: 'Cartoon Winter Sweatshirt',
    price: 18.00,
    category: 'kids',
    subCategory: 'Sweatshirt',
    imageUrl: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80',
    isWinterSpecial: true,
    description: 'Cute cartoon prints with a warm fleece interior.',
    sizes: ['4Y', '5Y', '6Y', '7Y', '8Y']
  },
  {
    id: 'k4',
    name: 'Kids Pajama Winter Set',
    price: 20.00,
    category: 'kids',
    subCategory: 'Pajama Set',
    imageUrl: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80',
    isWinterSpecial: true,
    description: 'Fuzzy winter pajamas for comfortable sleep.',
    sizes: ['4Y', '6Y', '8Y', '10Y']
  },
  {
    id: 'k5',
    name: 'Kids Winter Tracksuit',
    price: 24.00,
    category: 'kids',
    subCategory: 'Tracksuit',
    imageUrl: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=800&q=80',
    isWinterSpecial: true,
    description: 'Two piece set with warm fabric, ideal for school and outdoor play.',
    sizes: ['4Y', '6Y', '8Y', '10Y', '12Y']
  },
  {
    id: 'k6',
    name: 'Kids Fleece Jacket',
    price: 28.00,
    category: 'kids',
    subCategory: 'Jacket',
    imageUrl: 'https://images.unsplash.com/photo-1514090458221-4344e76f3752?auto=format&fit=crop&w=800&q=80',
    isWinterSpecial: true,
    description: 'Soft fleece zip-up jacket suitable for daily use.',
    sizes: ['4Y', '6Y', '8Y', '10Y']
  },
  {
    id: 'k7',
    name: 'Baby/Toddler Romper (Winter)',
    price: 16.00,
    category: 'kids',
    subCategory: 'Romper',
    imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
    isWinterSpecial: true,
    description: 'Warm rompers for small kids, soft and gentle on skin.',
    sizes: ['6M', '12M', '18M', '24M']
  },
  {
    id: 'k8',
    name: 'Kids Winter Beanie',
    price: 8.00,
    category: 'kids',
    subCategory: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80',
    isWinterSpecial: true,
    description: 'Cozy winter cap for children, available in multiple colors.',
    sizes: ['One Size']
  },
];

export const PAYMENT_METHODS = [
  { name: 'PayPal', icon: 'P' },
  { name: 'Payoneer', icon: 'Py' },
  { name: 'Wise', icon: 'W' },
  { name: 'Western Union', icon: 'WU' },
];
