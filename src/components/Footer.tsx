import React from 'react';
import Image from 'next/image';
import logoImg from '../../public/logo.jpg';
import { BookOpen, ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-16 pb-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          {/* Brand Info with real logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-neutral-900 border border-red-600/40 shadow-sm flex-shrink-0">
                <Image
                  src={logoImg}
                  alt="BARK Perú Logo"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white leading-none">
                  BARK<span className="text-red-600">.PE</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">
                  Performance & Gym
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Vendemos artículos, accesorios y suplementos para mejorar tu rendimiento en el gimnasio y deporte. Calidad certificada, pureza máxima y envíos a todo el territorio peruano.
            </p>

            <div className="space-y-2 text-xs text-neutral-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Lima, Perú • Despachos a nivel nacional</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>WhatsApp Atención: +51 987 654 321</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                <span>contacto@bark.pe</span>
              </div>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Categorías
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <a href="#catalogo" className="hover:text-red-400 transition">
                  Proteínas Isolate
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-red-400 transition">
                  Creatinas Puras
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-red-400 transition">
                  Pre-Entrenamientos
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-red-400 transition">
                  Cinturones & Straps
                </a>
              </li>
              <li>
                <a href="#combos-section" className="hover:text-red-400 transition">
                  Combos En Promo
                </a>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Atención al Cliente
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <a href="#" className="hover:text-red-400 transition">
                  Tiempos y Tarifas de Envío
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition">
                  Políticas de Garantía
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition">
                  Guía de Tallas para Cinturones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition">
                  Preguntas Frecuentes (FAQ)
                </a>
              </li>
              <li>
                <a href="#resenas" className="hover:text-red-400 transition">
                  Testimonios Reales
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Libro de reclamaciones */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Seguridad & Legal
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 text-xs">
                <div className="flex items-center gap-2 text-white font-bold mb-1">
                  <ShieldCheck className="w-4 h-4 text-red-500" />
                  <span>RUC: 20601234567</span>
                </div>
                <p className="text-[11px] text-neutral-400">
                  Comercializadora Deportiva BARK del Perú S.A.C.
                </p>
              </div>

              <a
                href="#"
                className="flex items-center gap-2 p-3 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-red-600 transition group"
              >
                <BookOpen className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-white">Libro de Reclamaciones</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Payment gateways & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © 2026 BARK Perú. Todos los derechos reservados.
          </div>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 bg-neutral-900 rounded border border-neutral-800 text-[10px] font-bold text-neutral-300">
              💳 VISA
            </span>
            <span className="px-2.5 py-1 bg-neutral-900 rounded border border-neutral-800 text-[10px] font-bold text-neutral-300">
              💳 MASTERCARD
            </span>
            <span className="px-2.5 py-1 bg-neutral-900 rounded border border-neutral-800 text-[10px] font-bold text-purple-400">
              📱 YAPE
            </span>
            <span className="px-2.5 py-1 bg-neutral-900 rounded border border-neutral-800 text-[10px] font-bold text-cyan-400">
              📱 PLIN
            </span>
            <span className="px-2.5 py-1 bg-neutral-900 rounded border border-neutral-800 text-[10px] font-bold text-amber-400">
              💵 PAGO EFECTIVO
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
