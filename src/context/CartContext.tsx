'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/types';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, selectedVariant?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  freeShippingAchieved: boolean;
  freeShippingProgress: number;
  generateWhatsAppLink: () => string;
}

const FREE_SHIPPING_THRESHOLD = 150; // S/. 150 for free shipping in Peru
const WHATSAPP_NUMBER = '51987654321'; // Placeholder Peruvian WhatsApp number

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Hydrate from localStorage on client
  useEffect(() => {
    setIsClient(true);
    try {
      const stored = localStorage.getItem('bark_cart');
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // Local storage unavailable or corrupt
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem('bark_cart', JSON.stringify(items));
      } catch {
        // Ignored
      }
    }
  }, [items, isClient]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen(prev => !prev);

  const addToCart = (product: Product, selectedVariant?: string) => {
    const variantKey = selectedVariant || (product.variants?.[0]?.options?.[0] ?? '');
    const itemId = `${product.id}-${variantKey}`;

    setItems(prevItems => {
      const existing = prevItems.find(item => item.id === itemId);
      if (existing) {
        return prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prevItems,
        {
          id: itemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          selectedVariant: variantKey || undefined,
          quantity: 1,
          isBundle: product.isBundle,
        },
      ];
    });

    // Auto open drawer like Minimog
    setIsOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingAchieved = subtotal >= FREE_SHIPPING_THRESHOLD;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const generateWhatsAppLink = () => {
    let message = `¡Hola BARK Perú! 💪 Deseo coordinar el siguiente pedido desde la web:\n\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      if (item.selectedVariant) {
        message += `   - Opción: ${item.selectedVariant}\n`;
      }
      message += `   - Cantidad: ${item.quantity}\n`;
      message += `   - Precio: S/. ${(item.price * item.quantity).toFixed(2)}\n\n`;
    });

    message += `💰 *Total Estimado: S/. ${subtotal.toFixed(2)} PEN*\n`;
    if (freeShippingAchieved) {
      message += `🚚 *¡Califica para Envío Gratis!* 🎁\n\n`;
    } else {
      message += `🚚 *Envío regular a coordinar (Lima o Provincia)*\n\n`;
    }
    message += `¿Tienen stock disponible y cuáles son sus datos para Yape / Plin / Transferencia?`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalItems,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        freeShippingAchieved,
        freeShippingProgress,
        generateWhatsAppLink,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
