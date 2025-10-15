export type Note = {
    name: string;
    icon: string;
    emoji?: string;
};

export type MainAccord = {
    name: string;
    value: number;
    color: string;
};

export type Season = 'Winter' | 'Spring' | 'Summer' | 'Autumn';

export type Sillage = 'Intimate' | 'Moderate' | 'Strong' | 'Enormous';

export type Perfume = {
    id: string;
    slug: string;
    name: string;
    brand: string;
    gender: 'Men' | 'Women' | 'Unisex';
    review: string;
    imageIds: string[];
    mainAccords: MainAccord[];
    notes: {
        top: Note[];
        heart: Note[];
        base: Note[];
    };
    occasions: string[];
    recommendedAge: string;
    isArabian: boolean;
    tags: string[];
    isCollection?: boolean;
    longevity: string;
    sillage: Sillage;
    dayTime: 'Day' | 'Night' | 'Both';
    seasons: Season[];
};

export type CartItem = Perfume & {
    quantity: number;
};

export type PriceConfig = {
    currencies: {
        usd: { symbol: string };
        bsf: { symbol: string; rate: number };
    };
    basePriceUSD: number;
    tiers: { min: number; price: number }[];
    quantityDiscounts: { min: number; discount: number }[];
};
