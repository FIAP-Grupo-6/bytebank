import { Skeleton } from '@/components/ui/skeleton';

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <Skeleton className="h-11 w-40" />
        <Skeleton className="h-11 w-32" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-2">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>

      <div>
        <div className="flex justify-between mb-4">
            <Skeleton className="h-7 w-16" />
            <Skeleton className="h-7 w-16" />
        </div>

        <div className="flex flex-col gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
            ))}
        </div>

      </div>
    </div>
  );
}
