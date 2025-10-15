
"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { calculateCart, formatPrice } from "@/lib/utils";
import { Minus, Plus, Trash2, MessageCircle, ArrowLeft, Smartphone, Landmark, Bitcoin, Store, Bike, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { WHATSAPP_NUMBER } from "@/lib/config";
import PlaceHolderImages from '@/lib/placeholder-images.json';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type ShippingMethod = 'pickup' | 'delivery' | 'courier';
type PaymentMethod = 'pagomovil' | 'transferencia' | 'binance';

const SHIPPING_COSTS: Record<ShippingMethod, { cost: number; label: string; details: string; icon: React.ComponentType<{className?: string}> }> = {
  pickup: { cost: 0, label: "Recoger en tienda", details: "Gratis", icon: Store },
  delivery: { cost: 4, label: "Delivery (solo Caracas)", details: formatPrice(4), icon: Bike },
  courier: { cost: 0, label: "Envío por Zoom / MRW", details: "A consultar", icon: Truck },
};

const PAYMENT_METHODS: Record<PaymentMethod, { label: string; icon: React.ComponentType<{className?: string}> }> = {
  pagomovil: { label: "Pago Móvil", icon: Smartphone },
  transferencia: { label: "Transferencia", icon: Landmark },
  binance: { label: "Binance", icon: Bitcoin },
};


export default function CheckoutPage() {
  const { items, updateQuantity, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();
  const [customerName, setCustomerName] = useState('');
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('pickup');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | undefined>();

  const { subtotal, totalQuantity, discountAmount, total: cartTotal, discountPercentage, nextDiscountTier } = calculateCart(items);

  const total = useMemo(() => {
    return cartTotal + SHIPPING_COSTS[shippingMethod].cost;
  }, [cartTotal, shippingMethod]);


  const handleQuantityChange = (perfumeId: string, quantity: number) => {
    if (quantity > 0) {
      updateQuantity(perfumeId, quantity);
    } else {
      removeFromCart(perfumeId);
    }
  };
  
  const handleCheckout = () => {
    if (!customerName) {
      toast({
        title: "Falta tu nombre",
        description: "Por favor, ingresa tu nombre para continuar.",
        variant: "destructive",
      });
      return;
    }
    
    if (!paymentMethod) {
      toast({
        title: "Falta el método de pago",
        description: "Por favor, selecciona un método de pago.",
        variant: "destructive",
      });
      return;
    }

    const orderItems = items.map(item => `- ${item.quantity}x ${item.name} (${item.brand})`).join('\n');
    
    const shippingDetails = `*Método de envío:* ${SHIPPING_COSTS[shippingMethod].label}`;
    const paymentDetails = `*Método de pago:* ${PAYMENT_METHODS[paymentMethod!].label}`;

    const message = `
¡Hola! Quiero hacer un pedido:

*Cliente:* ${customerName}

*Perfumes:*
${orderItems}

${shippingDetails}
${paymentDetails}

*Resumen del Pedido:*
Subtotal: ${formatPrice(subtotal)}
Descuento: -${formatPrice(discountAmount)} (${discountPercentage}%)
Costo de envío: ${SHIPPING_COSTS[shippingMethod].cost > 0 ? formatPrice(SHIPPING_COSTS[shippingMethod].cost) : SHIPPING_COSTS[shippingMethod].details}
*Total: ${formatPrice(total)}*
`;
    const encodedMessage = encodeURIComponent(message.trim());
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="font-headline text-3xl font-bold">Tu Carrito está Vacío</h1>
        <p className="mt-4 text-muted-foreground">
          Parece que no has añadido ningún perfume.
        </p>
        <Button asChild className="mt-6">
          <Link href="/perfumes">Explorar Perfumes</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-muted/40">
      <div className="container mx-auto grid min-h-screen grid-cols-1 gap-x-12 py-8 md:py-16 lg:grid-cols-2">
        {/* Left Side - Order Summary & Customer Details */}
        <div className="flex flex-col">
          <Link href="/perfumes" className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a la tienda
          </Link>
          
          <div className="space-y-6">
            <h1 className="font-headline text-3xl font-bold">Resumen de tu pedido</h1>
            {nextDiscountTier && (
              <div className="rounded-md border border-dashed border-primary/50 bg-primary/10 p-3 text-center text-sm text-primary">
                ¡Añade {nextDiscountTier.min - totalQuantity} más para un {nextDiscountTier.discount * 100}% de descuento!
              </div>
            )}
            {items.map((item) => {
              const image = PlaceHolderImages.placeholderImages.find(p => p.id === `${item.slug}-1`);
              return (
                <div key={item.id} className="flex items-start gap-4">
                  {image && (
                      <Image
                      src={image.imageUrl}
                      alt={item.name}
                      data-ai-hint={image.imageHint}
                      width={80}
                      height={80}
                      className="rounded-lg border object-cover"
                    />
                  )}
                  <div className="flex-grow">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.brand}</p>
                    <p className="mt-1 font-mono text-sm font-medium">{formatPrice(calculateCart([item]).total)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8 shrink-0" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8 shrink-0" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                     <Button variant="ghost" size="icon" className="ml-2 text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Side - Checkout Card */}
        <div className="mt-8 lg:mt-0">
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle>Finalizar Compra</CardTitle>
                    <CardDescription>Completa tus datos para enviar tu pedido por WhatsApp.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Indícanos tu nombre</Label>
                        <Input id="name" placeholder="Tu nombre" value={customerName} onChange={e => setCustomerName(e.target.value)}/>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="mb-4 font-medium">Método de Envío</h3>
                       <RadioGroup value={shippingMethod} onValueChange={(value: string) => setShippingMethod(value as ShippingMethod)} className="gap-4">
                        {Object.entries(SHIPPING_COSTS).map(([key, { label, details, icon: Icon }]) => (
                          <Label key={key} htmlFor={`shipping-${key}`} className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 hover:bg-accent hover:text-accent-foreground has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                            <RadioGroupItem value={key} id={`shipping-${key}`} />
                            <Icon className="h-6 w-6 text-primary" />
                            <div className="flex-grow">
                              <p className="font-semibold">{label}</p>
                            </div>
                            <p className="font-semibold">{details}</p>
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>

                    <Separator />
                    
                    <div>
                      <h3 className="mb-4 font-medium">Método de Pago</h3>
                       <RadioGroup value={paymentMethod} onValueChange={(value: string) => setPaymentMethod(value as PaymentMethod)} className="gap-4">
                        {Object.entries(PAYMENT_METHODS).map(([key, { label, icon: Icon }]) => (
                          <Label key={key} htmlFor={`payment-${key}`} className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 hover:bg-accent hover:text-accent-foreground has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                            <RadioGroupItem value={key} id={`payment-${key}`} />
                            <Icon className="h-6 w-6 text-primary" />
                            <div className="flex-grow">
                              <p className="font-semibold">{label}</p>
                            </div>
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal ({totalQuantity} items)</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-green-600">
                            <span className="text-muted-foreground">Descuento ({discountPercentage}%)</span>
                            <span>-{formatPrice(discountAmount)}</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Envío</span>
                          <span>{SHIPPING_COSTS[shippingMethod].cost > 0 ? formatPrice(SHIPPING_COSTS[shippingMethod].cost) : SHIPPING_COSTS[shippingMethod].details}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>{formatPrice(total)}</span>
                        </div>
                    </div>

                </CardContent>
                <CardFooter>
                <Button size="lg" className="w-full bg-green-600 text-white hover:bg-green-700" onClick={handleCheckout}>
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Pedir por WhatsApp
                </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}

    