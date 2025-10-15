
"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "./ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { calculateCart, formatPrice } from "@/lib/utils";
import Link from "next/link";
import PlaceHolderImages from '@/lib/placeholder-images.json';
import { useState } from "react";

export function CartIcon() {
  const { items, cartCount, updateQuantity, removeFromCart, isCartReady } = useCart();
  const { subtotal, total, discountAmount, discountPercentage, nextDiscountTier } = calculateCart(items);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {isCartReady && cartCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
            >
              {cartCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Tu Carrito ({isCartReady ? cartCount : 0})</SheetTitle>
        </SheetHeader>
        {isCartReady && items.length > 0 ? (
          <>
            <div className="flex-grow overflow-y-auto pr-4">
              <ul className="space-y-4">
                {items.map(item => {
                  const image = PlaceHolderImages.placeholderImages.find(p => p.id === `${item.slug}-1`);
                  return (
                    <li key={item.id} className="flex gap-4">
                      {image && (
                         <Image
                          src={image.imageUrl}
                          alt={item.name}
                          data-ai-hint={image.imageHint}
                          width={64}
                          height={64}
                          className="rounded-md object-cover"
                        />
                      )}
                      <div className="flex-grow">
                        <p className="font-semibold">{item.name}</p>
                        <div className="mt-2 flex items-center gap-2">
                           <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                       <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  )
                })}
              </ul>
            </div>
            <SheetFooter className="mt-auto flex-col pt-4">
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                     <div className="flex justify-between text-green-600">
                        <span>Descuento ({discountPercentage}%)</span>
                        <span>-{formatPrice(discountAmount)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                    </div>
                    {nextDiscountTier && (
                      <div className="pt-1 text-center text-xs text-muted-foreground">
                        Añade {nextDiscountTier.min - cartCount} más para un {nextDiscountTier.discount * 100}% de descuento.
                      </div>
                    )}
                </div>
                <Button asChild size="lg" className="mt-4 w-full" onClick={() => setIsOpen(false)}>
                  <Link href="/checkout">Ir a Checkout</Link>
                </Button>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-grow flex-col items-center justify-center text-center">
            <ShoppingCart className="mb-4 h-16 w-16 text-muted-foreground" />
            <p className="text-lg font-semibold">Tu carrito está vacío</p>
            <p className="text-sm text-muted-foreground">Añade perfumes para verlos aquí.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
