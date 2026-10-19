'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import logoImg from '../../public/logo.jpg';
import { ShoppingBag, Search, Menu, X, PhoneCall } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface NavbarProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
  onSelectObjective?: (obj: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  const { openCart, totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Tienda Completa', category: 'todos', target: 'catalogo' },
    { label: 'Elige tu Objetivo', category: 'objetivos', target: 'objetivos-section' },
    { label: 'Combos En Promo 🔥', category: 'bundles', target: 'combos-section' },
    { label: 'Suplementos', category: 'suplementos', target: 'catalogo' },
    { label: 'Accesorios & Gym', category: 'accesorios', target: 'catalogo' },
  ];

  const handleNavClick = (link: (typeof navLinks)[0]) => {
    if (link.category !== 'objetivos') {
      onSelectCategory(link.category);
    }
    setMobileMenuOpen(false);

    const el = document.getElementById(link.target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-neutral-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Mobile hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-neutral-800 hover:text-red-600 focus:outline-hidden"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Real Company Brand Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-neutral-950 border border-red-600/30 shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
                <Image
                  src={logoImg}
                  alt="BARK Perú Logo"
                  fill
                  sizes="44px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-neutral-950 leading-none">
                  BARK<span className="text-red-600">.PE</span>
                </span>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-neutral-500 leading-tight">
                  Performance & Gym
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => {
              const isActive = selectedCategory === link.category;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className={`text-sm font-bold tracking-tight transition-all duration-200 relative py-2 cursor-pointer ${
                    isActive
                      ? 'text-red-600'
                      : 'text-neutral-700 hover:text-red-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
                  )}
                </button>
              );
            })}
            <a
              href="#resenas"
              className="text-sm font-bold tracking-tight text-neutral-700 hover:text-red-600 transition"
            >
              Testimonios
            </a>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://wa.me/51987654321?text=Hola,%20deseo%20asesoría%20sobre%20los%20suplementos%20BARK"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Asesoría Deportiva</span>
            </a>

            {/* Cart Trigger Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-xl bg-neutral-950 text-white hover:bg-red-600 transition-all flex items-center gap-2 group shadow-sm cursor-pointer"
              aria-label="Ver carrito"
            >
              <ShoppingBag className="w-5 h-5 text-neutral-100 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold hidden sm:inline">Carrito</span>
              <span className="bg-red-600 text-white text-xs font-black px-1.5 py-0.5 rounded-full min-w-[20px] text-center leading-none shadow-xs">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              className={`block w-full text-left py-2.5 px-3 rounded-lg text-sm font-bold ${
                selectedCategory === link.category
                  ? 'bg-red-600 text-white'
                  : 'text-neutral-800 hover:bg-neutral-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <a
            href="#resenas"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
          >
            ⭐ Reseñas de Atletas
          </a>
          <div className="pt-3 border-t border-neutral-100">
            <a
              href="https://wa.me/51987654321?text=Hola,%20deseo%20asesoría%20sobre%20los%20productos"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-red-600 text-white rounded-lg text-sm font-bold shadow-sm"
            >
              <PhoneCall className="w-4 h-4" />
              Hablar con un Asesor Deportivo
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
