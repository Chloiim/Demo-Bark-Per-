'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface BundlesSectionProps {
  bundles: Product[];
}

export const BundlesSection: React.FC<BundlesSectionProps> = ({ bundles }) => {
  const { addToCart } = useCart();
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});

  const handleVariantChange = (productId: string, variant: string) => {
    setSelectedVariants(prev => ({ ...prev, [productId]: variant }));
  };

  return (
    <section id="bundles-section" className="py-16 bg-neutral-900 text-white relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Combos Inteligentes • Mayor Rendimiento por Menos</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              PACKS DE RENDIMIENTO CON DESCUENTO
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl">
              Diseñados por entrenadores para combinar el efecto sinérgico de suplementos y accesorios clave con ahorro directo.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-xs text-amber-400 font-bold flex items-center gap-1.5 bg-neutral-800/80 px-4 py-2 rounded-xl border border-neutral-700">
            <span>🎁 Todos los packs incluyen ENVÍO GRATIS a Lima y Provincias</span>
          </div>
        </div>

        {/* Bundles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {bundles.map(bundle => {
            const currentVariant =
              selectedVariants[bundle.id] || bundle.variants?.[0]?.options?.[0] || '';
            const savings = bundle.originalPrice ? bundle.originalPrice - bundle.price : 0;

            return (
              <div
                key={bundle.id}
                className="bg-neutral-950/80 border border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-neutral-700 transition-all duration-300 shadow-xl group"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <span className="inline-block bg-amber-400 text-black text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                        {bundle.badge || 'PACK ESPECIAL'}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-400 transition-colors">
                        {bundle.name}
                      </h3>
                      <p className="text-neutral-400 text-xs sm:text-sm mt-1">
                        {bundle.description}
                      </p>
                    </div>
                  </div>

                  {/* Bundle Image & Inclusions Split */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center mb-6 bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800/60">
                    <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden bg-neutral-900">
                      <Image
                        src={bundle.image}
                        alt={bundle.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                      {bundle.stockLeft && (
                        <div className="absolute bottom-2 left-2 bg-neutral-900/90 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs border border-amber-400/30">
                          ⚠️ Solo quedan {bundle.stockLeft} combos
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <span className="text-xs uppercase font-extrabold tracking-wider text-neutral-400 block">
                        Este pack incluye:
                      </span>
                      <ul className="space-y-2">
                        {bundle.benefits.map((benefit, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2 text-xs text-neutral-200">
                            <div className="w-4 h-4 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                            <span className="leading-snug">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Variant Selection if available */}
                  {bundle.variants && bundle.variants.length > 0 && (
                    <div className="mb-6 space-y-2">
                      <label className="text-xs font-bold text-neutral-300 block">
                        Selecciona {bundle.variants[0].name}:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {bundle.variants[0].options.map(option => {
                          const isSelected = currentVariant === option;
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleVariantChange(bundle.id, option)}
                              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-amber-400 text-black border-amber-400 font-bold shadow-xs'
                                  : 'bg-neutral-900 text-neutral-300 border-neutral-700 hover:border-neutral-500'
                              }`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Price & Action */}
                <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-white">
                        S/. {bundle.price.toFixed(2)}
                      </span>
                      {bundle.originalPrice && (
                        <span className="text-sm font-semibold text-neutral-500 line-through">
                          S/. {bundle.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {savings > 0 && (
                      <span className="text-xs font-bold text-emerald-400">
                        Te ahorras S/. {savings.toFixed(2)} comprando en combo
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(bundle, currentVariant)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 text-black font-extrabold text-sm hover:bg-amber-300 active:scale-95 transition-all shadow-lg shadow-amber-400/20 cursor-pointer"
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
