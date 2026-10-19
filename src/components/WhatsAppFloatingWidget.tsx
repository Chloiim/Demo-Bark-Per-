'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Shield, Dumbbell } from 'lucide-react';

export const WhatsAppFloatingWidget = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl =
    'https://wa.me/51987654321?text=' +
    encodeURIComponent(
      '¡Hola Team BARK! 💪 Deseo asesoría personalizada de un entrenador para elegir los suplementos y accesorios ideales para mi meta deportiva.'
    );

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Speech bubble tooltip */}
      {showTooltip && (
        <div className="mb-3 max-w-[260px] bg-white p-3.5 rounded-2xl shadow-2xl border border-neutral-200/90 relative animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-700 p-0.5 cursor-pointer"
            aria-label="Cerrar mensaje"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700">
              Coach BARK en línea
            </span>
          </div>

          <p className="text-xs text-neutral-700 leading-snug">
            ¿Dudas sobre qué tomar para tu meta o qué talla de cinturón pedir? <strong>Escríbenos en vivo.</strong>
          </p>

          <div className="mt-2 pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-400">
            <span>Respuesta en &lt; 2 min</span>
            <span className="font-bold text-red-600">Asesoría Gratis</span>
          </div>

          {/* Pointer tail */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-neutral-200/90 transform rotate-45" />
        </div>
      )}

      {/* Main Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl hover:shadow-emerald-600/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white text-white group-hover:scale-110 transition-transform" />

        {/* Pulse effect */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 text-white text-[9px] font-black items-center justify-center">
            1
          </span>
        </span>
      </a>
    </div>
  );
};
