import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { CartDrawer } from '@/components/CartDrawer';
import { CMSProvider } from '@/context/CMSContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'BARK Perú | Suplementos & Accesorios para Gimnasio y Deporte',
  description:
    'Vendemos artículos, accesorios y suplementos para mejorar tu rendimiento en el gimnasio y deporte. Envíos a todo el Perú (Lima 24h, provincias 48h). Paga con Yape, Plin o Tarjeta.',
  keywords: [
    'suplementos perú',
    'creatina creapure lima',
    'proteína whey isolate perú',
    'accesorios gimnasio perú',
    'cinturón lever belt powerlifting',
    'straps peso muerto',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-neutral-900 font-sans selection:bg-amber-400 selection:text-black">
        <CartProvider>
          <CMSProvider>
            {children}
            <CartDrawer />
          </CMSProvider>
        </CartProvider>
      </body>
    </html>
  );
}
