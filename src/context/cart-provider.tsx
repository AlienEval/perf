
"use client";

import { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { CartItem, Perfume } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import Link from 'next/link';
import { calculateCart, formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CartContextType {
  items: CartItem[];
  addToCart: (perfume: Perfume, quantity?: number) => void;
  removeFromCart: (perfumeId: string) => void;
  updateQuantity: (perfumeId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  isCartReady: boolean;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast, dismiss } = useToast();
  const [isCartReady, setIsCartReady] = useState(false);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('perfumeCart');
      if (storedCart) {
        setItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
    } finally {
      setIsCartReady(true);
    }
  }, []);

  useEffect(() => {
    if (isCartReady) {
      localStorage.setItem('perfumeCart', JSON.stringify(items));
    }
  }, [items, isCartReady]);

  const addToCart = useCallback((perfume: Perfume, quantity: number = 1) => {
    let updatedItems: CartItem[] = [];
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === perfume.id);
      if (existingItem) {
        updatedItems = prevItems.map(item =>
          item.id === perfume.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updatedItems = [...prevItems, { ...perfume, quantity }];
      }
      
      setTimeout(() => {
          const { nextDiscountTier, totalQuantity } = calculateCart(updatedItems);

          let discountMessage = "";
          if (nextDiscountTier) {
              const itemsNeeded = nextDiscountTier.min - totalQuantity;
              if (itemsNeeded > 0) {
                discountMessage = `¡Añade ${itemsNeeded} más para un ${nextDiscountTier.discount * 100}% de descuento!`;
              }
          }

          const {id: toastId} = toast({
              title: "Añadido al carrito",
              description: (
                  <div>
                      <p>{quantity} x {perfume.name}</p>
                      {discountMessage && <p className="mt-2 text-sm text-green-600 font-semibold">{discountMessage}</p>}
                  </div>
              ),
              action: (
                <div className='flex flex-col gap-2 w-full'>
                    <Button asChild onClick={() => dismiss(toastId)}>
                      <Link href="/checkout">Ir a Checkout</Link>
                    </Button>
                    <Button variant="secondary" onClick={() => dismiss(toastId)}>
                      Seguir Comprando
                    </Button>
                </div>
              ),
          });
      }, 0)

      return updatedItems;
    });

  }, [toast, dismiss]);

  const removeFromCart = useCallback((perfumeId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== perfumeId));
  }, []);

  const updateQuantity = useCallback((perfumeId: string, quantity: number) => {
    setItems(prevItems => {
      if (quantity <= 0) {
        return prevItems.filter(item => item.id !== perfumeId);
      }
      return prevItems.map(item =>
        item.id === perfumeId ? { ...item, quantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const cartCount = isCartReady ? items.reduce((count, item) => count + item.quantity, 0) : 0;

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    isCartReady,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
