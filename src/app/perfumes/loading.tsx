
import { Skeleton } from "@/components/ui/skeleton";
import { PERFUMES_PER_PAGE } from "@/lib/config";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mt-8 flex justify-center">
        <div className="flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
        </div>
      </div>
      
      <div className="mt-6 space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:hidden">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
        </div>
        <div className="hidden md:block space-y-6">
            <div>
                <h3 className="mb-4 text-lg font-semibold"><Skeleton className="h-6 w-40" /></h3>
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-24 rounded-full" />
                    <Skeleton className="h-8 w-24 rounded-full" />
                </div>
            </div>
            <div>
                <h3 className="mb-4 text-lg font-semibold"><Skeleton className="h-6 w-40" /></h3>
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-24 rounded-full" />
                    {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-8 w-24 rounded-full" />)}
                </div>
            </div>
             <div>
                <h3 className="mb-4 text-lg font-semibold"><Skeleton className="h-6 w-40" /></h3>
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-24 rounded-full" />
                    {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-8 w-24 rounded-full" />)}
                </div>
            </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {[...Array(PERFUMES_PER_PAGE)].map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="aspect-[3/4] w-full" />
            <Skeleton className="h-5 w-4/5" />
            <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
            </div>
            <Skeleton className="h-9 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
