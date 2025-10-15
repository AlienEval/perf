"use client";

import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import type { Perfume } from "@/lib/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Minus, Plus, ShoppingCart } from "lucide-react";

interface AddToCartSectionProps {
  perfume: Perfume;
}

export function AddToCartSection({ perfume }: AddToCartSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    addToCart(perfume, quantity);
  };

  return (
    <div className="flex items-center gap-4 rounded-lg border bg-card p-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10"
          onClick={() => handleQuantityChange(-1)}
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="h-10 w-16 text-center"
          min="1"
        />
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10"
          onClick={() => handleQuantityChange(1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button size="lg" className="flex-grow" onClick={handleAddToCart}>
        <ShoppingCart className="mr-2 h-5 w-5" />
        Añadir al carrito
      </Button>
    </div>
  );
}
