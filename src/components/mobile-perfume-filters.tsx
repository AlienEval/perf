
"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"

interface FilterProps {
  brands: string[];
  occasions: string[];
  brand?: string;
  occasion?: string;
  isArabian: boolean;
  searchParams: { [key: string]: string | string[] | undefined };
}

export function MobilePerfumeFilters({ brands, occasions, brand, occasion, isArabian, searchParams }: FilterProps) {
  const router = useRouter();

  const handleFilterChange = (filterName: string, value: string) => {
    const currentParams = new URLSearchParams();
    for (const [key, val] of Object.entries(searchParams)) {
        if (typeof val === 'string') {
            currentParams.set(key, val);
        } else if (Array.isArray(val)) {
            val.forEach(v => currentParams.append(key, v));
        }
    }
    
    if (value === 'all') {
      currentParams.delete(filterName);
    } else {
      currentParams.set(filterName, value);
    }
    
    router.push(`/perfumes?${currentParams.toString()}`);
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Select value={isArabian ? 'true' : 'all'} onValueChange={(value) => handleFilterChange('isArabian', value)}>
            <SelectTrigger>
                <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">Todos los Tipos</SelectItem>
                <SelectItem value="true">Árabes</SelectItem>
            </SelectContent>
        </Select>
      
        <Select value={brand || 'all'} onValueChange={(value) => handleFilterChange('brand', value)}>
            <SelectTrigger>
                <SelectValue placeholder="Marca" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">Todas las Marcas</SelectItem>
                {brands.map((b) => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                ))}
            </SelectContent>
        </Select>

        <Select value={occasion || 'all'} onValueChange={(value) => handleFilterChange('occasion', value)}>
            <SelectTrigger>
                <SelectValue placeholder="Ocasión" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">Todas las Ocasiones</SelectItem>
                {occasions.map((o) => (
                    <SelectItem key={o} value={o}>{o}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
  )
}
