"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PerfumeCard } from "./perfume-card";
import type { Perfume } from "@/lib/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";

interface PerfumeCarouselProps {
  perfumes: Perfume[];
}

export function PerfumeCarousel({ perfumes }: PerfumeCarouselProps) {
  const isMobile = useIsMobile();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!perfumes.length) return null;

  if (isClient && isMobile) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {perfumes.slice(0, 6).map((perfume) => (
          <PerfumeCard key={perfume.id} perfume={perfume} />
        ))}
      </div>
    )
  }

  if (!isClient) {
    // Render a placeholder or null on the server to avoid hydration mismatch
    return null;
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {perfumes.map((perfume) => (
          <CarouselItem key={perfume.id} className="md:basis-1/3 lg:basis-1/4 xl:basis-1/6">
            <div className="p-1">
              <PerfumeCard perfume={perfume} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute -left-2 top-1/2 -translate-y-1/2 transform text-white bg-black/50 hover:bg-black/70" />
      <CarouselNext className="absolute -right-2 top-1/2 -translate-y-1/2 transform text-white bg-black/50 hover:bg-black/70" />
    </Carousel>
  );
}
