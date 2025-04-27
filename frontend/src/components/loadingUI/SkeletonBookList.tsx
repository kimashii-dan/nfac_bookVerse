import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function SkeletonBookList() {
  return (
    <div className="list">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="max-w-[350px] mx-auto w-full">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-7" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-3 rounded-sm w-2/5" />
            </CardDescription>
          </CardHeader>

          <CardContent className="centered-column gap-10">
            <Skeleton className="w-56 h-80 object-cover rounded-sm" />
            <CardAction className="centered-row">
              <Skeleton className="w-28 h-8" />
              <div className="group gap-2">
                <Skeleton className="h-8 w-15" />
              </div>
            </CardAction>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
