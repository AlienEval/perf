
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { getPerfumes } from '@/lib/data';
import { PerfumeCarousel } from '@/components/perfume-carousel';
import PlaceHolderImages from '@/lib/placeholder-images.json';
import { NewsletterModal } from '@/components/newsletter-modal';
import { Gem } from 'lucide-react';

export default function Home() {
  const { perfumes: popularPerfumes } = getPerfumes({ tag: 'popular' });
  const { perfumes: arabianBestsellers } = getPerfumes({ tag: 'exclusivo-arabe' });
  const { perfumes: bestsellers } = getPerfumes({ tag: 'mas-vendido' });
  const { perfumes: collections } = getPerfumes({ isCollection: true });
  const { perfumes: arabianCollections } = getPerfumes({ isCollection: true, isArabian: true });

  const heroImage = PlaceHolderImages.placeholderImages.find(p => p.id === 'hero');

  return (
    <div className="flex flex-col">
      <NewsletterModal />
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="relative z-10 flex h-full flex-col items-center justify-center bg-black/50 p-4 text-center">
          <h1 className="font-headline text-3xl font-bold md:text-4xl">
            Tu Esencia, Tu Huella
          </h1>
          <p className="mt-4 max-w-2xl text-lg">
            Explora, Descubre y Define Tu Aroma
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <Button asChild size="lg" variant="outline" className="border-2 border-white bg-transparent text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-primary">
              <Link href="/perfumes?gender=Women">Para Ella</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white bg-transparent text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-primary">
              <Link href="/perfumes?gender=Men">Para Él</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quality Banner Section */}
      <section className="bg-secondary/50 py-8">
        <div className="container mx-auto flex flex-col items-center gap-6 px-4 text-center md:flex-row md:items-start md:gap-8 md:text-left">
          <div className="flex-shrink-0 rounded-full bg-primary/10 p-3">
            <Gem className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="font-headline text-xl font-semibold">Calidad Excepcional a tu Alcance</h2>
            <p className="mt-2 text-muted-foreground">
              Ofrecemos fragancias de inspiración Triple A, logrando una similitud del 98% con las originales. Nuestra propuesta le permite explorar y descubrir una variedad de aromas antes de invertir en su esencia definitiva.
            </p>
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="bg-background pt-12 md:pt-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-headline text-3xl font-bold">
            Populares
          </h2>
          <PerfumeCarousel perfumes={popularPerfumes} />
        </div>
      </section>

      {/* Arabian Bestsellers Section */}
      <section className="bg-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-headline text-3xl font-bold">
            Populares Árabes
          </h2>
          {arabianBestsellers.length > 0 ? (
            <PerfumeCarousel perfumes={arabianBestsellers} />
          ) : (
            <p className="text-center text-muted-foreground">Próximamente, los mejores perfumes árabes.</p>
          )}
        </div>
      </section>
      
      {/* Mas Vendidos Section */}
      <section className="bg-secondary/50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-headline text-3xl font-bold">
            Los Más Vendidos
          </h2>
          {bestsellers.length > 0 ? (
            <PerfumeCarousel perfumes={bestsellers} />
          ) : (
            <p className="text-center text-muted-foreground">Descubre pronto nuestros productos más vendidos.</p>
          )}
        </div>
      </section>


      {/* Collections Section */}
      {collections.length > 0 && (
        <section className="bg-background pt-12 pb-6 md:pt-20 md:pb-10">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center font-headline text-3xl font-bold">Compra por Colección</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {collections.slice(0, 6).map((perfume) => {
                const collectionImage = PlaceHolderImages.placeholderImages.find(p => p.id === `${perfume.slug}-1`);
                return (
                  <Link href={`/perfumes?brand=${perfume.brand}`} key={perfume.id}>
                    <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                      <CardContent className="relative h-56 w-full p-0">
                        {collectionImage && (
                          <Image
                            src={collectionImage.imageUrl}
                            alt={`Colección ${perfume.brand}`}
                            data-ai-hint={collectionImage.imageHint}
                            fill
                            className="object-cover"
                          />
                        )}
                      </CardContent>
                      <CardFooter className="flex items-center justify-center bg-neutral-100 p-2">
                         <h3 className="w-full truncate text-center font-headline text-sm font-semibold text-card-foreground">{perfume.brand}</h3>
                      </CardFooter>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
      
      {/* Arabian Collections Section */}
      {arabianCollections.length > 0 && (
        <section className="bg-secondary/50 pt-6 pb-12 md:pt-10 md:pb-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center font-headline text-3xl font-bold">Colección Árabe</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {arabianCollections.slice(0, 6).map((perfume) => {
                const collectionImage = PlaceHolderImages.placeholderImages.find(p => p.id === `${perfume.slug}-1`);
                return (
                  <Link href={`/perfumes?brand=${perfume.brand}&isArabian=true`} key={perfume.id}>
                    <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                      <CardContent className="relative h-56 w-full p-0">
                        {collectionImage && (
                          <Image
                            src={collectionImage.imageUrl}
                            alt={`Colección ${perfume.brand}`}
                            data-ai-hint={collectionImage.imageHint}
                            fill
                            className="object-cover"
                          />
                        )}
                      </CardContent>
                      <CardFooter className="flex items-center justify-center bg-neutral-100 p-2">
                         <h3 className="w-full truncate text-center font-headline text-sm font-semibold text-card-foreground">{perfume.brand}</h3>
                      </CardFooter>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
