
import type { MainAccord } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MainAccordsChartProps {
  accords: MainAccord[];
}

export function MainAccordsChart({ accords }: MainAccordsChartProps) {
  if (!accords || accords.length === 0) {
    return null;
  }

  // Sort accords by value descending
  const sortedAccords = [...accords].sort((a, b) => b.value - a.value);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Acordes Principales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sortedAccords.map((accord) => (
            <div key={accord.name} className="flex items-center gap-2">
              <div className="w-32 flex-shrink-0 text-sm font-medium capitalize text-muted-foreground">
                {accord.name}
              </div>
              <div className="h-6 flex-grow rounded-r-full bg-muted">
                <div
                  className="h-full rounded-r-full"
                  style={{ 
                    width: `${accord.value}%`,
                    backgroundColor: accord.color // Applying color via inline styles
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
