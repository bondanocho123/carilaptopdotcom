import { Skeleton } from "@/components/ui/skeleton"

export function LaptopSkeletonCard() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[150px] w-full rounded-xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
