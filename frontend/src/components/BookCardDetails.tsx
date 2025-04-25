import { BookDetailsType } from "../types";
import { Card } from "./ui/card";
import { Star, UserRoundSearch } from "lucide-react";

export default function BookCard({ book }: { book: BookDetailsType }) {
  return (
    <Card className="my-20 p-4 md:p-10">
      <div className="flex flex-col md:flex-row gap-10">
        <img
          src={book.image || "/placeholder.jpg"}
          alt={book.title}
          className="md:w-[45%] w-full object-cover rounded-lg"
        />

        <div className="md:w-[50%] flex flex-col gap-6">
          <div>
            <h2 className="text-3xl font-semibold">{book.title}</h2>
            <p className="text-lg text-muted-foreground">
              {book.author} • {book.publishDate}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Description</h3>
            <p className="text-muted-foreground my-4">{book.description}</p>
          </div>

          <div className="flex justify-between mt-auto text-sm md:text-base">
            <div className="group gap-2">
              <span>Rating: {book.averageRating ?? "?"}</span>
              <Star color="orange" fill="yellow" size="25" />
            </div>
            <div className="group gap-2">
              <span>Ratings count: {book.ratingsCount ?? "?"}</span>
              <UserRoundSearch color="gray" size="25" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
