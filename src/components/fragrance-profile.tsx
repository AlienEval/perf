
"use client"

import type { Perfume, Season } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Hourglass, Wind, Sun, Moon, Snowflake, Flower, Leaf, SunDim } from "lucide-react";
import { cn } from "@/lib/utils";

interface FragranceProfileProps {
    perfume: Perfume;
}

const sillageMap: Record<Perfume['sillage'], number> = {
    'Intimate': 1,
    'Moderate': 2,
    'Strong': 3,
    'Enormous': 4,
}

const seasonIcons: Record<Season, React.ComponentType<{ className?: string }>> = {
    Winter: Snowflake,
    Spring: Flower,
    Summer: Sun,
    Autumn: Leaf,
};

const seasonColors: Record<Season, string> = {
    Winter: "bg-blue-300 text-blue-900",
    Spring: "bg-pink-300 text-pink-900",
    Summer: "bg-yellow-400 text-yellow-900",
    Autumn: "bg-orange-400 text-orange-900",
}

const seasonTranslations: Record<Season, string> = {
    Winter: "Invierno",
    Spring: "Primavera",
    Summer: "Verano",
    Autumn: "Otoño",
};


export function FragranceProfile({ perfume }: FragranceProfileProps) {
    const { longevity, sillage, dayTime, seasons } = perfume;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Perfil de la Fragancia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 rounded-lg border p-3">
                        <Hourglass className="h-6 w-6 text-primary" />
                        <div>
                            <p className="text-sm text-muted-foreground">Duración en piel</p>
                            <p className="font-semibold">{longevity}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border p-3">
                         <Wind className="h-6 w-6 text-primary" />
                        <div>
                            <p className="text-sm text-muted-foreground">Estela</p>
                            <p className="font-semibold">{sillage}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="mb-2 text-sm font-medium">Uso</p>
                    <div className="flex w-full overflow-hidden rounded-full bg-muted">
                        <div className={cn("flex items-center justify-center gap-2 p-2 text-sm font-semibold", dayTime === 'Day' ? 'flex-grow bg-blue-400 text-white' : 'w-1/2')}>
                           <Sun className="h-4 w-4" /> Día
                        </div>
                         <div className={cn("flex items-center justify-center gap-2 p-2 text-sm font-semibold", dayTime === 'Night' ? 'flex-grow bg-gray-700 text-white' : 'w-1/2')}>
                           <Moon className="h-4 w-4" /> Noche
                        </div>
                         {dayTime === 'Both' && (
                             <div className="flex w-full items-center justify-center gap-2 bg-gradient-to-r from-blue-400 to-gray-700 p-2 text-sm font-semibold text-white">
                                <SunDim className="h-4 w-4" /> Día y Noche
                            </div>
                         )}
                    </div>
                </div>

                 <div>
                    <p className="mb-2 text-sm font-medium">Estaciones Recomendadas</p>
                    <div className="flex flex-wrap gap-2">
                        {seasons.map(season => {
                            const Icon = seasonIcons[season];
                            return (
                                <Badge 
                                    key={season} 
                                    className={cn(
                                        "flex items-center gap-2 border-none px-3 py-1 text-sm font-semibold",
                                        seasonColors[season]
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{seasonTranslations[season]}</span>
                                </Badge>
                            )
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
