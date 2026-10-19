export interface ProductVariant {
  name: string;
  options: string[];
}

export type FitnessObjective = 'todos' | 'definir' | 'masa' | 'fuerza' | 'energia';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'suplementos' | 'accesorios' | 'bundles';
  objective: 'definir' | 'masa' | 'fuerza' | 'energia';
  price: number; // in PEN (Soles)
  originalPrice?: number;
  rating: number; // e.g. 4.9
  reviewsCount: number;
  badge?: string; // e.g. "MÁS VENDIDO", "-20%", "TOP RENDIMIENTO"
  image: string;
  secondaryImage?: string;
  description: string;
  weight?: string;
  servingOrSpecs?: string;
  benefits: string[];
  variants?: ProductVariant[];
  inStock: boolean;
  stockLeft?: number;
  isBundle?: boolean;
  bundleIncludes?: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  selectedVariant?: string;
  quantity: number;
  isBundle?: boolean;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedBuyer: boolean;
  productName: string;
  userAvatar?: string;
}
