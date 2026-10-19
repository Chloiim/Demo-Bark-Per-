'use client';

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Product, FitnessObjective } from '@/types';
import { ProductCard } from './ProductCard';
import { OBJECTIVES } from '@/data/products';

interface ProductGridProps {
  products: Product[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  activeObjective: FitnessObjective;
  onClearObjective: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  activeObjective,
  onClearObjective,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'todos', label: 'Todos los Productos' },
    { id: 'mas-vendidos', label: 'Más Vendidos 🔥' },
    { id: 'suplementos', label: 'Suplementos Deportivos' },
    { id: 'accesorios', label: 'Accesorios & Gym' },
    { id: 'bundles', label: 'Combos en Promo' },
  ];

  const currentObjectiveObj = OBJECTIVES.find(o => o.id === activeObjective);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      let matchesCategory = true;
      if (activeCategory === 'todos') {
        matchesCategory = true;
      } else if (activeCategory === 'mas-vendidos') {
        matchesCategory = Boolean(product.badge?.includes('MÁS VENDIDO') || product.reviewsCount > 100);
      } else {
        matchesCategory = product.category === activeCategory;
      }

      // Objective filter
      const matchesObjective =
        activeObjective === 'todos' || product.objective === activeObjective;

      // Search query
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesObjective && matchesSearch;
    });
  }, [products, activeCategory, activeObjective, searchQuery]);

  return (
    <section id="catalogo" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-neutral-200">
        <div>
          <span className="text-xs uppercase font-black tracking-widest text-red-600 block mb-1">
            Catálogo Oficial BARK Perú 2026
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight">
            CATEGORÍAS DESTACADAS
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Mostrando {filteredProducts.length} productos listos para despacho en Lima y Provincias
          </p>
        </div>

        {/* Search bar */}
        <div className="w-full md:w-80 relative">
          <input
            type="text"
            placeholder="Buscar proteína, creatina, cinturón..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-hidden focus:border-red-600 focus:ring-1 focus:ring-red-600 bg-neutral-50"
          />
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-xs text-neutral-400 hover:text-black cursor-pointer"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Active Objective Pill Filter if applied */}
      {activeObjective !== 'todos' && currentObjectiveObj && (
        <div className="mb-6 flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-xl">
          <span className="text-xs text-neutral-600">Filtrando por objetivo:</span>
          <span className="text-xs font-black text-red-700 uppercase">
            {currentObjectiveObj.title}
          </span>
          <button
            onClick={onClearObjective}
            className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-800 bg-white px-2.5 py-1 rounded-lg border border-red-200 shadow-2xs cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Quitar filtro</span>
          </button>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`text-xs sm:text-sm font-black px-5 py-2.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
          <SlidersHorizontal className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-neutral-800">No se encontraron productos</h3>
          <p className="text-xs text-neutral-500 mt-1">
            Intenta con otro término de búsqueda o limpia los filtros.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              onSelectCategory('todos');
              onClearObjective();
            }}
            className="mt-4 px-5 py-2.5 bg-red-600 text-white text-xs font-black rounded-xl hover:bg-red-700 transition cursor-pointer"
          >
            Ver todos los productos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
