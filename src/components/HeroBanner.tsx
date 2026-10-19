'use client';

import React from 'react';
import { ShieldCheck, Flame, ArrowRight, Star, Award, Zap } from 'lucide-react';

interface HeroBannerProps {
  onExplore: () => void;
  onExploreBundles: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExplore, onExploreBundles }) => {
  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white min-h-[580px] sm:min-h-[640px] flex items-center">
      {/* Background with athletic overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-35 scale-105 transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1600&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
        <div className="absolute inset-0 bg-radial at-center from-transparent via-neutral-950/60 to-neutral-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-2xl">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-800/80 border border-neutral-700/60 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm backdrop-blur-md">
            <Flame className="w-3.5 h-3.5 fill-amber-400" />
            <span>Rendimiento Deportivo & Fuerza Imparable</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] mb-6">
            SUPLEMENTOS & ACCESORIOS PARA LLEVARTE AL{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500">
              MÁXIMO NIVEL.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed mb-8 max-w-xl">
            Fórmulas 100% puras sin relleno y equipamiento de grado competencia diseñados para atletas que se toman su progreso en serio en todo el Perú.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
            <button
              onClick={onExplore}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-amber-400 text-black font-extrabold text-sm hover:bg-amber-300 transition-all shadow-lg hover:shadow-amber-400/25 active:scale-95 group cursor-pointer"
            >
              <span>Explorar Catálogo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreBundles}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-neutral-900/90 text-white font-bold text-sm border border-neutral-700 hover:bg-neutral-800 hover:border-neutral-500 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Ver Packs con Descuento</span>
            </button>
          </div>

          {/* Micro Social Proof Bar */}
          <div className="pt-6 border-t border-neutral-800/80 flex flex-wrap items-center gap-6 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-white">4.9/5</span>
              <span>(+1,400 opiniones en Perú)</span>
            </div>

            <div className="flex items-center gap-2 text-neutral-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Grado Clínico & Competencia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
