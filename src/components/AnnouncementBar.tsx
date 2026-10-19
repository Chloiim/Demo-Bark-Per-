'use client';

import React, { useState, useEffect } from 'react';
import { Truck, ShieldCheck, Flame, ChevronLeft, ChevronRight } from 'lucide-react';

const MESSAGES = [
  { icon: Flame, text: 'Envío gratis por compras mayores a S/ 150 con el código BARK' },
  { icon: Truck, text: 'Envíos rápidos a todo el Perú (Lima 24h - Provincias 48h)' },
  { icon: ShieldCheck, text: 'Acumula Bark Points con cada compra y canjea descuentos' },
];

export const AnnouncementBar = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIdx(prev => (prev === 0 ? MESSAGES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx(prev => (prev + 1) % MESSAGES.length);
  };

  const CurrentIcon = MESSAGES[currentIdx].icon;

  return (
    <div className="bg-neutral-900 text-white text-xs font-medium py-2 px-4 border-b border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden lg:flex items-center gap-2 text-neutral-400">
          <span>🇵🇪 Tienda Oficial Perú</span>
          <span>•</span>
          <span className="text-red-400 font-semibold">Stock en Lima Listo para Envío</span>
        </div>

        <div className="flex-1 flex items-center justify-center gap-3 text-center overflow-hidden">
          <button
            onClick={handlePrev}
            className="text-neutral-400 hover:text-white transition p-0.5 hidden sm:block cursor-pointer"
            aria-label="Mensaje anterior"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2">
            <CurrentIcon className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
            <span className="font-semibold tracking-wide text-neutral-100">
              {MESSAGES[currentIdx].text}
            </span>
          </div>

          <button
            onClick={handleNext}
            className="text-neutral-400 hover:text-white transition p-0.5 hidden sm:block cursor-pointer"
            aria-label="Mensaje siguiente"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-neutral-400">
          <span className="font-semibold text-white">PEN (S/.)</span>
          <span>•</span>
          <a
            href="https://wa.me/51987654321?text=Hola,%20tengo%20una%20consulta%20sobre%20sus%20productos"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-400 transition"
          >
            Atención WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};
