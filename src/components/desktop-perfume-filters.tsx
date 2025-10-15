
"use client"

import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

interface FilterProps {
  brands: string[];
  occasions: string[];
  brand?: string;
  occasion?: string;
  isArabian: boolean;
  searchParams: { [key: string]: string | string[] | undefined };
}

export function DesktopPerfumeFilters({ brands, occasions, brand, occasion, isArabian, searchParams }: FilterProps) {

  const createQueryString = (name: string, value: string) => {
    const currentParams = new URLSearchParams();
     for (const [key, val] of Object.entries(searchParams)) {
      if (typeof val === 'string' && key !== 'q') {
        currentParams.set(key, val);
      } else if (Array.isArray(val)) {
        val.forEach(v => currentParams.append(key, v));
      }
    }
    const q = searchParams.q;
    if (q) {
      currentParams.set('q', typeof q === 'string' ? q : q[0]);
    }
    currentParams.set(name, value);
    return currentParams.toString();
  };

  const removeQueryString = (name: string) => {
    const currentParams = new URLSearchParams();
    for (const [key, val] of Object.entries(searchParams)) {
      if (typeof val === 'string' && key !== 'q') {
        currentParams.set(key, val);
      } else if (Array.isArray(val)) {
        val.forEach(v => currentParams.append(key, v));
      }
    }
    const q = searchParams.q;
    if (q) {
      currentParams.set('q', typeof q === 'string' ? q : q[0]);
    }
    currentParams.delete(name);
    return currentParams.toString();
  };
    
  return (
    <div className="space-y-6">
      <div>
          <h3 className="mb-4 text-lg font-semibold">Filtrar por Tipo</h3>
          <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
              <CarouselContent>
                    <CarouselItem className="basis-auto">
                      <Link href={`/perfumes?${removeQueryString('isArabian')}`}>
                          <Badge variant={!isArabian ? 'default' : 'secondary'} className="cursor-pointer px-4 py-2 text-sm">Todos</Badge>
                      </Link>
                  </CarouselItem>
                  <CarouselItem className="basis-auto">
                      <Link href={`/perfumes?${createQueryString('isArabian', 'true')}`}>
                          <Badge variant={isArabian ? 'default' : 'secondary'} className="cursor-pointer px-4 py-2 text-sm">Árabes</Badge>
                      </Link>
                  </CarouselItem>
              </CarouselContent>
          </Carousel>
      </div>
      <div>
          <h3 className="mb-4 text-lg font-semibold">Filtrar por Marca</h3>
          <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
              <CarouselContent>
                    <CarouselItem className="basis-auto">
                      <Link href={`/perfumes?${removeQueryString('brand')}`}>
                          <Badge variant={!brand ? 'default' : 'secondary'} className="cursor-pointer px-4 py-2 text-sm">Todas</Badge>
                      </Link>
                  </CarouselItem>
                  {brands.map((b) => (
                      <CarouselItem key={b} className="basis-auto">
                          <Link href={`/perfumes?${createQueryString('brand', b)}`}>
                              <Badge variant={brand === b ? 'default' : 'secondary'} className="cursor-pointer px-4 py-2 text-sm">{b}</Badge>
                          </Link>
                      </CarouselItem>
                  ))}
              </CarouselContent>
          </Carousel>
      </div>
      <div>
          <h3 className="mb-4 text-lg font-semibold">Filtrar por Ocasión</h3>
          <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
              <CarouselContent>
                  <CarouselItem className="basis-auto">
                      <Link href={`/perfumes?${removeQueryString('occasion')}`}>
                          <Badge variant={!occasion ? 'default' : 'secondary'} className="cursor-pointer px-4 py-2 text-sm">Todas</Badge>
                      </Link>
                  </CarouselItem>
                  {occasions.map((o) => (
                      <CarouselItem key={o} className="basis-auto">
                          <Link href={`/perfumes?${createQueryString('occasion', o)}`}>
                              <Badge variant={occasion === o ? 'default' : 'secondary'} className="cursor-pointer px-4 py-2 text-sm">{o}</Badge>
                          </Link>
                      </CarouselItem>
                  ))}
              </CarouselContent>
          </Carousel>
      </div>
    </div>
  )
}
