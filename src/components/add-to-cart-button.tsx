
"use client";

import { useCart } from "@/hooks/use-cart";
import type { Perfume } from "@/lib/types";
import { Button, type ButtonProps } from "./ui/button";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps extends ButtonProps {
  perfume: Perfume;
}

export function AddToCartButton({ perfume, children, ...props }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <Button onClick={() => addToCart(perfume, 1)} {...props}>
      <ShoppingCart className="mr-2 h-4 w-4" />
      {children || 'Añadir al carrito'}
    </Button>
  );
}
