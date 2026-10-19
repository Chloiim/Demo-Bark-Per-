'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { CheckCircle, X, Flame } from 'lucide-react';

interface PurchaseEvent {
  buyer: string;
  location: string;
  product: string;
  timeAgo: string;
  image: string;
}

const RECENT_PURCHASES: PurchaseEvent[] = [
  {
    buyer: 'Carlos M.',
    location: 'Surco, Lima',
    product: 'Creatina Micronizada 100% Pura 300g',
    timeAgo: 'hace 3 minutos',
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=200&auto=format&fit=crop',
  },
  {
    buyer: 'Mateo R.',
    location: 'Miraflores, Lima',
    product: 'Pack Fuerza & Hipertrofia Pro',
    timeAgo: 'hace 8 minutos',
    image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=200&auto=format&fit=crop',
  },
  {
    buyer: 'Diego V.',
    location: 'San Isidro, Lima',
    product: 'Cinturón Lever Belt 10mm (Edición Bark Red)',
    timeAgo: 'hace 14 minutos',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=200&auto=format&fit=crop',
  },
  {
    buyer: 'Valeria S.',
    location: 'Arequipa (Cayma)',
    product: 'Whey Protein Isolate 100% Pura 2kg',
    timeAgo: 'hace 22 minutos',
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?q=80&w=200&auto=format&fit=crop',
  },
];

export const SocialProofToast = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Initial delay before first toast
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    // Interval to cycle every 12 seconds
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIdx(prev => (prev + 1) % RECENT_PURCHASES.length);
        setIsVisible(true);
      }, 1000);
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [dismissed]);

  if (dismissed || !isVisible) return null;

  const current = RECENT_PURCHASES[currentIdx];

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-2xl p-3.5 shadow-2xl transition-all duration-500 animate-in slide-in-from-bottom-5">
      <div className="flex items-center gap-3">
        {/* Product Thumbnail */}
        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-200">
          <Image
            src={current.image}
            alt={current.product}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 mb-0.5">
            <span className="font-bold text-neutral-900">{current.buyer}</span>
            <span>en {current.location}</span>
          </div>

          <p className="text-xs font-black text-neutral-900 leading-tight truncate">
            {current.product}
          </p>

          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-0.5 text-[9px] font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200">
              <CheckCircle className="w-2.5 h-2.5" />
              Compra Verificada 🇵🇪
            </span>
            <span className="text-[10px] text-neutral-400">{current.timeAgo}</span>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => setDismissed(true)}
          className="text-neutral-400 hover:text-neutral-700 p-1 cursor-pointer"
          aria-label="Cerrar notificación"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
