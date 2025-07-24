import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
export default function PageLoadingSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4 space-y-6 animate-pulse">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
      <Skeleton className="h-9 w-full mb-6" />
      <Skeleton className="h-96 w-full rounded-lg mb-8" />
      <Skeleton className="h-5 w-32 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, id) => (
          <Card key={id}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
            <CardFooter className="flex gap-2 mt-4">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}