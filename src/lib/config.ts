
import type { PriceConfig } from "./types";

// Replace with your actual WhatsApp number, including the country code without the '+'
export const WHATSAPP_NUMBER = "1234567890"; 

export const PERFUMES_PER_PAGE = 20;

export const PRICE_CONFIG: PriceConfig = {
  currencies: {
    usd: { symbol: '$' },
    bsf: { symbol: 'Bs.F', rate: 200 }, // Pegged rate to USD, can be modified
  },
  basePriceUSD: 3.5,
  tiers: [
    { min: 6, price: 3.0 },
    { min: 12, price: 2.5 },
    { min: 16, price: 2.0 },
  ],
  quantityDiscounts: [
    { min: 6, discount: 0.08 },   // 8% for 6-9 perfumes
    { min: 10, discount: 0.12 },  // 12% for 10-15 perfumes
    { min: 16, discount: 0.18 },  // 18% for 16+ perfumes
  ]
};
