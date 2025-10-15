
"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Droplets, Search } from "lucide-react";
import { CartIcon } from "./cart-icon";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

export function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("q") as string;
    
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
    if (searchQuery) {
      currentParams.set('q', searchQuery);
    } else {
      currentParams.delete('q');
    }
    
    router.push(`/perfumes?${currentParams.toString()}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-primary text-primary-foreground">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Droplets className="h-6 w-6" />
          <span className="hidden font-headline sm:inline-block">DescubreTuPerfume</span>
        </Link>
        <div className="flex flex-1 items-center justify-end gap-4 md:justify-center">
            <form onSubmit={handleSearch} className="w-full max-w-sm">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        name="q"
                        placeholder="Buscar perfumes..."
                        className="w-full border-primary/30 bg-background/20 pl-9 text-primary-foreground placeholder:text-muted-foreground focus:bg-background/30"
                        defaultValue={searchParams.get('q') || ''}
                    />
                </div>
            </form>
        </div>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild className="hidden text-primary-foreground sm:inline-flex hover:bg-white/10 hover:text-primary-foreground">
            <Link href="/perfumes">Perfumes</Link>
          </Button>
          <CartIcon />
        </nav>
      </div>
    </header>
  );
}
