import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { REVIEWS } from '@/data/products';

export const ReviewsSection = () => {
  return (
    <section id="resenas" className="py-20 bg-neutral-50/80 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-black uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-red-600 text-red-600" />
            <span>Opiniones Verificadas Estilo Judge.me</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight">
            MÁS DE 12,000 ATLETAS CONFÍAN EN BARK PERÚ
          </h2>
          <p className="text-sm text-neutral-600 mt-2">
            Resultados reales en fuerza, masa muscular y rendimiento deportivo en Lima y Provincias.
          </p>

          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-extrabold text-neutral-900">4.9 de 5.0</span>
            <span className="text-xs text-neutral-400">• (+1,420 reseñas de clientes)</span>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map(rev => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-neutral-200/90 shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Rating & Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-400">{rev.date}</span>
                </div>

                {/* Title & Comment */}
                <h4 className="text-sm font-bold text-neutral-900 mb-2 leading-snug">
                  "{rev.title}"
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Author and verified badge */}
              <div className="pt-4 mt-6 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-neutral-900">{rev.author}</span>
                    {rev.verifiedBuyer && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full border border-red-100">
                        <CheckCircle className="w-2.5 h-2.5 text-red-600" />
                        Verificado
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-neutral-400 block">{rev.location}</span>
                </div>

                <div className="text-[10px] text-neutral-500 font-medium text-right max-w-[130px] truncate">
                  Compró: <strong className="text-neutral-800">{rev.productName}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
