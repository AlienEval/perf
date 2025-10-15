
import { getPerfumeBySlug, getPerfumes } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PerfumeCarousel } from "@/components/perfume-carousel";
import { AddToCartSection } from "@/components/add-to-cart-section";
import PlaceHolderImages from '@/lib/placeholder-images.json';
import { ProductImageCarousel } from "@/components/product-image-carousel";
import { MainAccordsChart } from "@/components/main-accords-chart";
import { FragranceProfile } from "@/components/fragrance-profile";
import { Truck, Sparkles, Clock } from "lucide-react";

export function generateStaticParams() {
  const { perfumes } = getPerfumes({});
  return perfumes.map((perfume) => ({
    slug: perfume.slug,
  }));
}

export default function PerfumeDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const perfume = getPerfumeBySlug(params.slug);

  if (!perfume) {
    notFound();
  }

  const { perfumes: recommendedProducts } = getPerfumes({ gender: perfume.gender });
  const filteredRecommended = recommendedProducts.filter(p => p.id !== perfume.id).slice(0, 8);
  const images = perfume.imageIds.map(id => PlaceHolderImages.placeholderImages.find(p => p.id === id)).filter(Boolean);
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <ProductImageCarousel images={images} altText={perfume.name} />
        </div>
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="text-sm">{perfume.brand}</Badge>
            <h1 className="mt-2 font-headline text-4xl font-bold">{perfume.name}</h1>
            <p className="text-lg text-muted-foreground">{perfume.gender}</p>
          </div>
          
          <p className="text-base leading-relaxed">{perfume.review}</p>

          <FragranceProfile perfume={perfume} />

          <MainAccordsChart accords={perfume.mainAccords} />

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Ocasiones</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {perfume.occasions.map(o => <Badge key={o}>{o}</Badge>)}
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle className="text-base">Edad Recomendada</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{perfume.recommendedAge}</p>
              </CardContent>
            </Card>
          </div>

          <AddToCartSection perfume={perfume} />
        </div>
      </div>

      <section className="mt-16 rounded-lg bg-muted/50 p-8 md:mt-24">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          <div className="flex flex-col items-center">
            <Truck className="h-8 w-8 text-primary" />
            <h3 className="mt-4 font-headline text-lg font-semibold">Envíos a toda Venezuela</h3>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="h-8 w-8 text-primary" />
            <h3 className="mt-4 font-headline text-lg font-semibold">Fragancias 98% similares a las originales</h3>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="h-8 w-8 text-primary" />
            <h3 className="mt-4 font-headline text-lg font-semibold">Duración de 4 a 5 horas</h3>
          </div>
        </div>
      </section>

      <div className="mt-16 md:mt-24">
        <h2 className="mb-8 text-center font-headline text-3xl font-bold">También te podría gustar</h2>
        <PerfumeCarousel perfumes={filteredRecommended} />
      </div>
    </div>
  );
}
