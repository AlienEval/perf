

import { getPerfumes, getBrands, getOccasions } from "@/lib/data";
import { PerfumeCard } from "@/components/perfume-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { MobilePerfumeFilters } from "@/components/mobile-perfume-filters";
import { DesktopPerfumeFilters } from "@/components/desktop-perfume-filters";
import { Pagination } from "@/components/pagination";
import { PERFUMES_PER_PAGE } from "@/lib/config";

export const dynamic = 'force-dynamic';

export default function PerfumesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const gender = typeof searchParams.gender === "string" ? searchParams.gender : "All";
  const brand = typeof searchParams.brand === "string" ? searchParams.brand : undefined;
  const occasion = typeof searchParams.occasion === "string" ? searchParams.occasion : undefined;
  const isArabian = searchParams.isArabian === 'true';
  const query = typeof searchParams.q === "string" ? searchParams.q : undefined;
  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;

  const { perfumes, totalCount } = getPerfumes({ gender, brand, occasion, isArabian, query, page, limit: PERFUMES_PER_PAGE });
  const brands = getBrands();
  const occasions = getOccasions();

  const totalPages = Math.ceil(totalCount / PERFUMES_PER_PAGE);

  const createQueryStringWithoutPage = (paramsToRemove: string[]) => {
    const currentParams = new URLSearchParams();
    for (const [key, val] of Object.entries(searchParams)) {
      if (typeof val === 'string') {
        currentParams.set(key, val);
      } else if (Array.isArray(val)) {
        val.forEach(v => currentParams.append(key, v));
      }
    }
    paramsToRemove.forEach(p => currentParams.delete(p));
    currentParams.delete('page');
    return currentParams.toString();
  };
  
  const createQueryStringWithPage = (name: string, value: string) => {
    const currentParams = new URLSearchParams();
    for (const [key, val] of Object.entries(searchParams)) {
      if (typeof val === 'string') {
        currentParams.set(key, val);
      } else if (Array.isArray(val)) {
        val.forEach(v => currentParams.append(key, v));
      }
    }
    currentParams.set(name, value);
    currentParams.delete('page');
    return currentParams.toString();
  };
  
  const filterProps = {
    brands,
    occasions,
    brand,
    occasion,
    isArabian,
    searchParams
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Tabs defaultValue={gender} className="mt-8 w-full">
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger value="All" asChild>
              <Link href={`/perfumes?${createQueryStringWithoutPage(['gender'])}`}>Todos</Link>
            </TabsTrigger>
            <TabsTrigger value="Women" asChild>
              <Link href={`/perfumes?${createQueryStringWithPage('gender', 'Women')}`}>Mujer</Link>
            </TabsTrigger>
            <TabsTrigger value="Men" asChild>
               <Link href={`/perfumes?${createQueryStringWithPage('gender', 'Men')}`}>Hombre</Link>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="mt-6 space-y-6">
            <div className="md:hidden">
              <MobilePerfumeFilters {...filterProps} />
            </div>
            <div className="hidden md:block">
              <DesktopPerfumeFilters {...filterProps} />
            </div>
        </div>

        <TabsContent value={gender}>
            {perfumes.length > 0 ? (
              <>
                <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {perfumes.map((perfume) => (
                        <PerfumeCard key={perfume.id} perfume={perfume} />
                    ))}
                </div>
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    searchParams={searchParams}
                />
              </>
            ) : (
                <div className="mt-16 text-center">
                    <p className="text-xl text-muted-foreground">No se encontraron perfumes con los filtros seleccionados.</p>
                    <Link href="/perfumes" className="mt-4 inline-block">
                        <Badge variant="secondary" className="cursor-pointer px-4 py-2 text-sm">Limpiar filtros</Badge>
                    </Link>
                </div>
            )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
