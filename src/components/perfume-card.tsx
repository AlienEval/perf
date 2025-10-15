
"use client";

import Image from "next/image";
import Link from "next/link";
import type { Perfume } from "@/lib/types";
import { Card, CardContent } from "./ui/card";
import { AddToCartButton } from "./add-to-cart-button";
import PlaceHolderImages from '@/lib/placeholder-images.json';
import { Badge } from "./ui/badge";
import { formatPrice, calculatePrice } from "@/lib/utils";
import { Woman, Man, Unisex } from "@/components/gender-icons";

interface PerfumeCardProps {
  perfume: Perfume;
}

export function PerfumeCard({ perfume }: PerfumeCardProps) {
  const image = PlaceHolderImages.placeholderImages.find(p => p.id === perfume.imageIds[0]);
  const price = calculatePrice(1);

  const getTagLabel = (tag: string) => {
    switch (tag) {
      case 'popular':
        return 'Popular';
      case 'mas-vendido':
        return 'Más Vendido';
      case 'exclusivo-arabe':
        return 'Exclusivo';
      default:
        return tag;
    }
  };

  const GenderIcon = () => {
    switch (perfume.gender) {
      case 'Women':
        return <Woman className="h-4 w-4 text-muted-foreground" />;
      case 'Men':
        return <Man className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Unisex className="h-4 w-4 text-muted-foreground" />;
    }
  };


  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      <CardContent className="p-0">
        <Link href={`/perfumes/${perfume.slug}`}>
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            {image &&
              <Image
                src={image.imageUrl}
                alt={perfume.name}
                data-ai-hint={image.imageHint}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            }
            {perfume.tags && perfume.tags.length > 0 && (
              <div className="absolute top-2 left-2 z-10 flex flex-col items-start gap-1">
                {perfume.tags.map(tag => (
                  <Badge key={tag} variant="destructive">
                    {getTagLabel(tag)}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Link>
        <div className="space-y-3 p-3 sm:p-4">
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">{perfume.brand}</p>
            <h3 className="truncate font-bold text-sm sm:text-base text-card-foreground">{perfume.name}</h3>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <GenderIcon />
              <p className="text-xs sm:text-sm text-muted-foreground">60 ml</p>
            </div>
            <p className="font-mono text-base sm:text-lg font-bold text-primary">{formatPrice(price)}</p>
          </div>
          <AddToCartButton perfume={perfume} size="sm" className="w-full text-xs sm:text-sm">Añadir</AddToCartButton>
        </div>
      </CardContent>
    </Card>
  );
}
