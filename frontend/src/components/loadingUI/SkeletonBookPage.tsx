import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function SkeletonBookPage() {
  return (
    <Card className="my-20 p-4 base:p-10">
      <div className="flex flex-col base:flex-row gap-10">
        <Skeleton className="base:w-[45%] w-full h-[500px] base:h-[650px] rounded-lg" />

        <div className="base:w-[50%] flex flex-col gap-6">
          <div className="space-y-3">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="h-4 w-3/6" />
          </div>

          <Skeleton className="w-3/5 h-10" />

          <div className="flex justify-between mt-auto">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
