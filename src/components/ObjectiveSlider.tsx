'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { OBJECTIVES } from '@/data/products';
import { FitnessObjective } from '@/types';

interface ObjectiveSliderProps {
  onSelectObjective: (objId: FitnessObjective) => void;
  activeObjective: FitnessObjective;
}

export const ObjectiveSlider: React.FC<ObjectiveSliderProps> = ({
  onSelectObjective,
  activeObjective,
}) => {
  return (
    <section id="objetivos-section" className="py-16 sm:py-20 bg-neutral-50/70 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-red-600 block mb-2">
            Entrenamiento Personalizado
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-neutral-900">
            ELIGE TU OBJETIVO
          </h2>
          <p className="text-sm text-neutral-500 mt-2">
            Selecciona tu meta deportiva para filtrar los suplementos y accesorios que necesitas hoy.
          </p>
        </div>

        {/* 4 Objective Cards (Exact Timmy style) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {OBJECTIVES.map(obj => {
            const isSelected = activeObjective === obj.id;
            return (
              <div
                key={obj.id}
                onClick={() => onSelectObjective(obj.id)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 aspect-[3/4] flex flex-col justify-end p-5 shadow-sm hover:shadow-xl ${
                  isSelected
                    ? 'ring-4 ring-red-600 scale-[1.02]'
                    : 'hover:-translate-y-1'
                }`}
              >
                {/* Background image */}
                <Image
                  src={obj.image}
                  alt={obj.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-red-950/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Content */}
                <div className="relative z-10">
                  <span className="text-[10px] font-black tracking-wider uppercase text-red-400 bg-red-950/80 px-2 py-0.5 rounded inline-block mb-1.5 backdrop-blur-xs border border-red-800/40">
                    {obj.tag}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white leading-tight flex items-center justify-between group-hover:text-red-300 transition-colors">
                    <span>{obj.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </h3>
                  <p className="text-[11px] text-neutral-300 mt-1 line-clamp-2 hidden sm:block">
                    {obj.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
