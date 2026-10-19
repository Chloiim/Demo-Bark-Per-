'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

export const CartDrawer = () => {
  const {
    items,
    isOpen,
    closeCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalItems,
    amountNeededForFreeShipping,
    freeShippingAchieved,
    freeShippingProgress,
    generateWhatsAppLink,
  } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const hasUpsellItem = items.some(
    item => item.productId === 'shaker-acero-inoxidable-termico'
  );

  const handleAddUpsell = () => {
    const upsellProduct: Product = {
      id: 'shaker-acero-inoxidable-termico',
      name: 'Shaker Térmico de Acero Inoxidable (Edición Bark Red)',
      slug: 'shaker-termico-acero-750ml',
      category: 'accesorios',
      objective: 'energia',
      price: 39, // Special In-cart offer! S/. 39 instead of S/. 59
      originalPrice: 59,
      rating: 4.9,
      reviewsCount: 110,
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
      description: 'Mantiene tus batidos helados hasta por 12 horas.',
      benefits: ['Acero inoxidable quirúrgico 18/8', 'Cero olores y libre de BPA'],
      inStock: true,
      variants: [{ name: 'Color', options: ['Negro Matte con Rojo'] }],
    };
    addToCart(upsellProduct, 'Negro Matte con Rojo');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={closeCart}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/70">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-neutral-900" />
              <h2 className="text-base font-black text-neutral-900 tracking-tight">
                Tu Carrito ({totalItems})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition cursor-pointer"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Dynamic Progress Bar (Minimog Signature Feature) */}
          <div className="p-4 bg-red-50/80 border-b border-red-100">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-800 mb-2">
              <Truck className="w-4 h-4 text-red-600 flex-shrink-0" />
              {freeShippingAchieved ? (
                <span className="text-emerald-700 flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  ¡Felicidades! Tienes <strong>ENVÍO GRATIS</strong> a todo el Perú
                </span>
              ) : (
                <span>
                  Te faltan{' '}
                  <strong className="text-red-600 font-black">
                    S/. {amountNeededForFreeShipping.toFixed(2)}
                  </strong>{' '}
                  para tener <strong>ENVÍO GRATIS</strong>
                </span>
              )}
            </div>
            <div className="w-full bg-red-200/60 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  freeShippingAchieved ? 'bg-emerald-500' : 'bg-red-600'
                }`}
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-100">
            {items.length === 0 ? (
              <div className="py-24 text-center">
                <div className="w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-neutral-800">Tu carrito está vacío</h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                  Agrega suplementos o accesorios para mejorar tu rendimiento hoy mismo.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-6 px-6 py-2.5 bg-neutral-950 text-white rounded-xl text-xs font-black hover:bg-red-600 transition cursor-pointer"
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              <>
                {items.map(item => (
                  <div key={item.id} className="py-4 flex gap-4 items-start">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 rounded-xl bg-neutral-100 overflow-hidden flex-shrink-0 border border-neutral-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-snug line-clamp-2">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-400 hover:text-red-600 p-1 transition cursor-pointer"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.selectedVariant && (
                        <span className="inline-block mt-1 text-[11px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-md">
                          {item.selectedVariant}
                        </span>
                      )}

                      <div className="mt-3 flex items-center justify-between">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:text-black text-neutral-500 cursor-pointer"
                            aria-label="Disminuir"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-bold text-neutral-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:text-black text-neutral-500 cursor-pointer"
                            aria-label="Aumentar"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Total for this item */}
                        <div className="text-right">
                          <span className="text-xs sm:text-sm font-black text-neutral-900">
                            S/. {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* 1-Click CRO Upsell Box (FoxKit In-Cart Cross-Sell) */}
                {!hasUpsellItem && (
                  <div className="mt-4 p-3.5 bg-gradient-to-r from-red-50 to-neutral-50 rounded-2xl border border-red-200 shadow-2xs">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white border border-neutral-200 flex-shrink-0">
                        <Image
                          src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=200&auto=format&fit=crop"
                          alt="Shaker de Acero BARK"
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-black uppercase text-red-600 block leading-none mb-1">
                          🔥 OFERTA EXCLUSIVA DE CARRITO
                        </span>
                        <h5 className="text-xs font-black text-neutral-900 leading-tight truncate">
                          Shaker Térmico de Acero BARK (750ml)
                        </h5>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <span className="text-xs font-black text-red-600">S/. 39.00</span>
                          <span className="text-[10px] text-neutral-400 line-through">S/. 59.00</span>
                          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1 rounded">
                            Ahorras S/. 20
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={handleAddUpsell}
                        className="px-3 py-2 bg-neutral-950 hover:bg-red-600 text-white rounded-xl text-xs font-black transition-all flex items-center gap-1 flex-shrink-0 cursor-pointer shadow-xs active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Agregar</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer & Checkout Actions */}
          {items.length > 0 && (
            <div className="p-5 border-t border-neutral-200 bg-neutral-50/70 space-y-4">
              {/* Calculations */}
              <div className="space-y-1.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-black text-neutral-900 text-sm">
                    S/. {subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span className="font-semibold text-neutral-900">
                    {freeShippingAchieved ? (
                      <span className="text-emerald-600 font-bold uppercase">¡Gratis!</span>
                    ) : (
                      'Calculado en el checkout'
                    )}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                {/* WhatsApp Direct Order Button */}
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-600/20 active:scale-98 transition-all"
                >
                  <span>📲 Pedir por WhatsApp (Yape / Plin)</span>
                </a>

                {/* Standard Card Checkout Button */}
                <button
                  onClick={() =>
                    alert(
                      '¡Excelente! Aquí se conecta directamente la pasarela de pagos (Mercado Pago Perú, Culqi, Izipay) o el checkout de Shopify.'
                    )
                  }
                  className="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-red-600/20 active:scale-98 transition-all cursor-pointer"
                >
                  <span>Pagar con Tarjeta (Checkout Seguro)</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Trust micro-footer */}
              <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-center gap-2 text-[11px] text-neutral-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Compra 100% Segura con Encriptación SSL</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
