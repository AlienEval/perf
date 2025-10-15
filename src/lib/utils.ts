import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PRICE_CONFIG } from "./config"
import type { CartItem } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  amount: number,
  currency: 'usd' | 'bsf' = 'usd'
) {
  const { currencies } = PRICE_CONFIG;
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  };
  
  const formatter = new Intl.NumberFormat('en-US', options);

  if (currency === 'bsf') {
    const bsfAmount = amount * currencies.bsf.rate;
    // Intl doesn't support BSF, so we format manually
    return `${currencies.bsf.symbol} ${bsfAmount.toLocaleString('es-VE', { minimumFractionDigits: 2 })}`;
  }

  return formatter.format(amount).replace(/USD/g, currencies.usd.symbol);
}

export function calculatePrice(quantity: number) {
  const { basePriceUSD, tiers } = PRICE_CONFIG;
  let applicableTier = tiers.slice().reverse().find(tier => quantity >= tier.min);
  return applicableTier ? applicableTier.price : basePriceUSD;
}

export function calculateCart(items: CartItem[]) {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const subtotal = items.reduce((sum, item) => {
    const pricePerItem = calculatePrice(totalQuantity);
    return sum + pricePerItem * item.quantity;
  }, 0);
  
  const { quantityDiscounts } = PRICE_CONFIG;
  const applicableDiscount = quantityDiscounts.slice().reverse().find(d => totalQuantity >= d.min);
  
  const discountAmount = applicableDiscount ? subtotal * applicableDiscount.discount : 0;
  const total = subtotal - discountAmount;
  
  let nextDiscountTier = quantityDiscounts.find(d => totalQuantity < d.min);

  return {
    subtotal,
    totalQuantity,
    discountAmount,
    total,
    discountPercentage: applicableDiscount ? applicableDiscount.discount * 100 : 0,
    nextDiscountTier,
  };
}
