import React from 'react';
import { Truck, ShieldCheck, CreditCard, MessageCircleQuestion } from 'lucide-react';

export const TrustBadges = () => {
  const features = [
    {
      icon: Truck,
      title: 'Envíos Rápidos en Perú',
      subtitle: 'Lima entrega en 24h • Provincias vía Olva o Shalom',
    },
    {
      icon: ShieldCheck,
      title: '100% Calidad & Pureza',
      subtitle: 'Fórmulas puras sin relleno y accesorios de alta durabilidad',
    },
    {
      icon: CreditCard,
      title: 'Pagos con Yape & Plin',
      subtitle: 'Transferencias BCP, Interbank y tarjetas sin comisión extra',
    },
    {
      icon: MessageCircleQuestion,
      title: 'Asesoría Personalizada',
      subtitle: 'Te guiamos por WhatsApp según tu meta física',
    },
  ];

  return (
    <section className="bg-white border-b border-neutral-200/80 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 p-3 bg-neutral-50 sm:bg-transparent rounded-2xl sm:rounded-none border sm:border-0 border-neutral-200/70"
              >
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 border border-red-200">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-neutral-900 leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5 leading-snug">
                    {item.subtitle}
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
