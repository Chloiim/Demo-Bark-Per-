import React from 'react';
import { Flame, ShieldCheck, Zap, Truck, Dumbbell } from 'lucide-react';

export const ScrollingTicker = () => {
  const items = [
    { icon: Flame, text: 'APROVECHA EL LANZAMIENTO CON HASTA 30% OFF' },
    { icon: Truck, text: 'ENVÍOS EN 24H A LIMA Y TODO EL PERÚ' },
    { icon: ShieldCheck, text: 'CALIDAD 100% PURA SIN RELLENO' },
    { icon: Zap, text: 'ENVÍO GRATIS POR COMPRAS MAYORES A S/ 150' },
    { icon: Dumbbell, text: 'ACCESORIOS DE GRADO COMPETENCIA' },
  ];

  return (
    <div className="bg-red-600 text-white py-3 overflow-hidden select-none border-y border-red-700">
      <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
        {/* First repetition */}
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={`a-${idx}`} className="flex items-center gap-2.5 text-xs sm:text-sm font-black tracking-wider uppercase">
              <Icon className="w-4 h-4 fill-white/90 text-white flex-shrink-0" />
              <span>{item.text}</span>
              <span className="text-red-300 ml-6">•</span>
            </div>
          );
        })}

        {/* Second repetition for seamless loop */}
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={`b-${idx}`} className="flex items-center gap-2.5 text-xs sm:text-sm font-black tracking-wider uppercase">
              <Icon className="w-4 h-4 fill-white/90 text-white flex-shrink-0" />
              <span>{item.text}</span>
              <span className="text-red-300 ml-6">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
