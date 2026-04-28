import { Skeleton } from "@/components/ui/skeleton";

export function TransactionsSkeleton() {
  return (
    <div className="flex flex-col gap-8">

      <div className="flex justify-between">
        <Skeleton className="h-11 w-40" />
        <Skeleton className="h-11 w-40" />
      </div>

      <Skeleton className="h-11 w-full" />

      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24" />
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>

      <div className="flex justify-center">
        <Skeleton className="h-7 w-48" />
      </div>

    </div>
  );
}