'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingBag, ArrowRight, Check, Zap } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface PromoCardsGridProps {
  bundles: Product[];
}

export const PromoCardsGrid: React.FC<PromoCardsGridProps> = ({ bundles }) => {
  const { addToCart } = useCart();

  return (
    <section id="combos-section" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Timmy exact header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-neutral-100">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-red-600 block mb-1">
              Ofertas listas para comprar
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-neutral-900">
              COMBOS EN PROMO
            </h2>
            <p className="text-sm text-neutral-500 mt-1 max-w-xl">
              Haz clic en cualquier promo y te agregamos el combo directo al carrito con descuento aplicado.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-extrabold text-red-600 bg-red-50 px-4 py-2 rounded-xl border border-red-200">
            <Zap className="w-4 h-4 text-red-600" />
            <span>Envío Gratis incluido a todo el Perú</span>
          </div>
        </div>

        {/* 3 Promos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {bundles.map(bundle => {
            const savings = bundle.originalPrice ? bundle.originalPrice - bundle.price : 0;

            return (
              <div
                key={bundle.id}
                className="group bg-neutral-950 text-white rounded-3xl overflow-hidden border border-neutral-800 flex flex-col justify-between hover:border-red-600/70 transition-all duration-300 shadow-xl"
              >
                <div>
                  {/* Image with hover effect */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                    <Image
                      src={bundle.image}
                      alt={bundle.name}
                      fill
                      className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />

                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-600 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-md shadow-md">
                        {bundle.badge || 'PROMO PACK'}
                      </span>
                    </div>

                    {savings > 0 && (
                      <div className="absolute top-4 right-4 bg-black/80 text-red-400 text-[11px] font-black px-2.5 py-1 rounded-md backdrop-blur-xs border border-red-500/30">
                        AHORRAS S/. {savings.toFixed(2)}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="text-lg sm:text-xl font-black text-white leading-tight mb-2 group-hover:text-red-400 transition-colors">
                      {bundle.name}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                      {bundle.description}
                    </p>

                    {/* Includes list */}
                    <div className="space-y-1.5 pt-3 border-t border-neutral-800/80">
                      <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-2">
                        Incluye en este combo:
                      </span>
                      {bundle.benefits.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-neutral-200">
                          <Check className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Price & Action */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-2 mb-4">
                    <div>
                      <span className="text-xs text-neutral-400 block">Precio Combo</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-white">
                          S/. {bundle.price.toFixed(2)}
                        </span>
                        {bundle.originalPrice && (
                          <span className="text-xs font-semibold text-neutral-500 line-through">
                            S/. {bundle.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(bundle)}
                    className="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 active:scale-98 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-600/30 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Agregar Combo al Carrito</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
