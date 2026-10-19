'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Flame } from 'lucide-react';

interface HeroSliderProps {
  onExplore: () => void;
  onExploreObjectives: () => void;
  onExploreCombos: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onExplore,
  onExploreObjectives,
  onExploreCombos,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      tag: '🔥 OFICIAL PERÚ • EDICIÓN ATLETA',
      title: 'SUPLEMENTOS & ACCESORIOS PARA MAXIMIZAR TU RENDIMIENTO.',
      subtitle:
        'Vendemos artículos, accesorios y suplementos de grado competencia formulados para mejorar tu fuerza, masa muscular y recuperación en el gimnasio y deporte.',
      image:
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1600&auto=format&fit=crop',
      btnText: 'Ver Catálogo Completo',
      btnAction: onExplore,
      secondaryBtnText: 'Elige tu Objetivo',
      secondaryBtnAction: onExploreObjectives,
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
      btnAction: onExploreCombos,
      secondaryBtnText: 'Ver Accesorios',
      secondaryBtnAction: onExplore,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] flex items-center">
      {/* Background with smooth transition */}
      {slides.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
            idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center transform scale-105 duration-1000 ease-out"
            style={{ backgroundImage: `url('${s.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-neutral-950/40" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-black uppercase tracking-wider mb-5 backdrop-blur-md">
            <Flame className="w-3.5 h-3.5 fill-red-500 text-red-500" />
            <span>{slide.tag}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] mb-5">
            {slide.title}
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed mb-8 max-w-xl">
            {slide.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <button
              onClick={slide.btnAction}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-red-600 text-white font-black text-sm hover:bg-red-700 active:scale-95 transition-all shadow-lg shadow-red-600/30 cursor-pointer"
            >
              <span>{slide.btnText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={slide.secondaryBtnAction}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-neutral-900/90 text-white font-bold text-sm border border-neutral-700 hover:bg-neutral-800 hover:border-neutral-500 transition-all cursor-pointer"
            >
              <span>{slide.secondaryBtnText}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white items-center justify-center border border-white/10 backdrop-blur-xs transition cursor-pointer"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white items-center justify-center border border-white/10 backdrop-blur-xs transition cursor-pointer"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2 transition-all rounded-full cursor-pointer ${
              i === currentSlide ? 'w-8 bg-red-600' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Ir al slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
