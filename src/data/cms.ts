import { Product } from '@/types';
import { PRODUCTS } from './products';

export interface CmsHeroSlide {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  btnText: string;
  secondaryBtnText: string;
}

export interface CmsContent {
  products: Product[];
  announcementMessages: string[];
  heroSlides: CmsHeroSlide[];
}

export const DEFAULT_HERO_SLIDES: CmsHeroSlide[] = [
  {
    id: 1,
    tag: '🔥 OFICIAL PERÚ • EDICIÓN ATLETA',
    title: 'SUPLEMENTOS & ACCESORIOS PARA MAXIMIZAR TU RENDIMIENTO.',
    subtitle:
      'Vendemos artículos, accesorios y suplementos de grado competencia formulados para mejorar tu fuerza, masa muscular y recuperación en el gimnasio y deporte.',
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1600&auto=format&fit=crop',
    btnText: 'Ver Catálogo Completo',
    secondaryBtnText: 'Elige tu Objetivo',
  },
  {
    id: 2,
    tag: '⚡ COMBOS EN PROMO • AHORRA HASTA S/. 70',
    title: 'COMBOS DE FUERZA & HIPERTROFIA LISTOS PARA COMPRAR.',
    subtitle:
      'La combinación ideal: Proteína Isolate ultra pura + Creatina monohidratada + Accesorios heavy-duty con ENVÍO GRATIS a todo el Perú.',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop',
    btnText: 'Ver Combos en Promo',
    secondaryBtnText: 'Ver Accesorios',
  },
];

export const DEFAULT_CMS_CONTENT: CmsContent = {
  products: PRODUCTS,
  announcementMessages: [
    'Envío gratis por compras mayores a S/ 150 con el código BARK',
    'Envíos rápidos a todo el Perú (Lima 24h - Provincias 48h)',
    'Acumula Bark Points con cada compra y canjea descuentos',
  ],
  heroSlides: DEFAULT_HERO_SLIDES,
};
