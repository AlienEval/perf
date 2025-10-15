
"use client";

import { Droplets, Instagram, Facebook, Twitter } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);


  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Droplets className="h-6 w-6" />
            <span className="font-headline">DescubreTuPerfume</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} DescubreTuPerfume. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5 transition-colors hover:text-white/80" />
            </Link>
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-5 w-5 transition-colors hover:text-white/80" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 transition-colors hover:text-white/80" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
