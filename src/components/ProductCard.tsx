'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0]?.options?.[0] || ''
  );
  const [isHovered, setIsHovered] = useState(false);

  const handleAdd = () => {
    addToCart(product, selectedVariant);
  };

  return (
    <div
      className="group bg-white rounded-2xl border border-neutral-200/90 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-neutral-400 transition-all duration-300 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        {/* Product Image */}
        <div className="relative aspect-square w-full bg-neutral-100 overflow-hidden">
          <Image
            src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Badges in Red */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            {product.badge && (
              <span className="bg-red-600 text-white text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-md shadow-xs">
                {product.badge}
              </span>
            )}
            {product.originalPrice && (
              <span className="bg-neutral-900 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Stock Scarcity Trigger */}
          {product.stockLeft && product.stockLeft <= 8 && (
            <div className="absolute bottom-2 left-2 right-2 bg-neutral-950/90 text-red-400 text-[11px] font-bold py-1 px-2.5 rounded-md text-center backdrop-blur-xs flex items-center justify-center gap-1.5 border border-red-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              <span>¡Solo quedan {product.stockLeft} unidades!</span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4 sm:p-5">
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-neutral-800">{product.rating.toFixed(1)}</span>
            <span className="text-[11px] text-neutral-400">({product.reviewsCount})</span>
          </div>

          {/* Specs / Serving */}
          <div className="text-[10px] uppercase font-extrabold text-neutral-400 tracking-wider mb-1">
            {product.servingOrSpecs || product.category}
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-extrabold text-neutral-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-2 min-h-[40px]">
            {product.name}
          </h3>

          {/* Variant Selector (Pills) */}
          {product.variants && product.variants.length > 0 && (
            <div className="mt-3">
              <span className="text-[11px] text-neutral-500 font-semibold block mb-1.5">
                {product.variants[0].name}: <span className="text-neutral-900 font-bold">{selectedVariant}</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.variants[0].options.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedVariant(option)}
                    className={`text-[11px] px-2.5 py-1 rounded-md border font-semibold transition-all cursor-pointer ${
                      selectedVariant === option
                        ? 'bg-neutral-950 text-white border-neutral-950 font-bold'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-red-600'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: Price & Add to Cart Button */}
      <div className="p-4 sm:p-5 pt-0 border-t border-neutral-100 mt-2">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg sm:text-xl font-black text-neutral-900">
            S/. {product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs font-semibold text-neutral-400 line-through">
              S/. {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <button
          onClick={handleAdd}
          className="w-full py-3 px-4 rounded-xl bg-neutral-950 text-white font-black text-xs sm:text-sm hover:bg-red-600 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-xs group/btn cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4 text-white group-hover/btn:scale-110 transition-transform" />
          <span>Añadir al Carrito</span>
        </button>
      </div>
    </div>
  );
};
