"use client";

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail } from 'lucide-react';
import Image from 'next/image';
import PlaceHolderImages from '@/lib/placeholder-images.json';

const NEWSLETTER_SHOWN_KEY = 'newsletterModalShown';

export function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const heroImage = PlaceHolderImages.placeholderImages.find(p => p.id === 'hero');

  useEffect(() => {
    const hasBeenShown = localStorage.getItem(NEWSLETTER_SHOWN_KEY);
    if (!hasBeenShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem(NEWSLETTER_SHOWN_KEY, 'true');
      }, 3000); // Show after 3 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the form submission, e.g., send to an API
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md overflow-hidden p-0">
        <div className="relative h-48 w-full">
            {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt="Fondo de perfumes"
                    data-ai-hint={heroImage.imageHint}
                    fill
                    className="object-cover"
                />
            )}
            <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="p-6">
            <DialogHeader className="text-center">
                <Mail className="mx-auto mb-2 h-10 w-10 text-primary" />
                <DialogTitle className="font-headline text-2xl font-bold">
                    Únete a Nuestro Club Exclusivo
                </DialogTitle>
                <DialogDescription className="mt-2">
                    Obtén un <span className="font-bold text-primary">15% de descuento</span> en tu próxima compra y sé el primero en conocer lanzamientos y ofertas secretas.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="mt-6 flex w-full flex-col gap-2 sm:flex-row">
                <Input
                type="email"
                placeholder="Tu correo electrónico"
                className="bg-background text-foreground placeholder:text-muted-foreground"
                required
                />
                <Button type="submit" variant="default">
                Suscribirme
                </Button>
            </form>
            <Button variant="link" className="mt-2 w-full text-muted-foreground" onClick={() => setIsOpen(false)}>
                No, gracias
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
