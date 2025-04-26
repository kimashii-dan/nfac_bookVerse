import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { BookDetailsType, BookToStore } from "../types";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Loader2, Star, UserRoundSearch } from "lucide-react";
import { addFavorite } from "../helpers/api";
import { toast } from "sonner";

export default function BookCard({
  book,
  isFavoritePage,
}: {
  book: BookDetailsType;
  isFavoritePage?: boolean;
}) {
  const { isAuthenticated } = useAuth();

  const mutation = useMutation({
    mutationFn: addFavorite,
    onSuccess: (data) => {
      console.log(data);
      toast("Successfully added to favorites", {
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    },
    onError: (error) => {
      toast("Submission error", {
        description: error.message,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
        className: "bg-destructive",
      });
    },
  });

  function handleAddBook() {
    const formattedBook: BookToStore = {
      id: book.id,
      title: book.title,
      author: book.author,
      publish_date: book.publishDate,
      image: `https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`,
      average_rating: Number(book.averageRating),
    };

    mutation.mutate(formattedBook);
  }

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

          {isAuthenticated && !isFavoritePage && (
            <Button
              className="w-3/5 text-sm md:text-base"
              onClick={() => handleAddBook()}
            >
              {mutation.isPending ? <Loader2 /> : "Add to favorites"}
            </Button>
          )}

          <div className="flex justify-between mt-auto text-sm md:text-base">
            <div className="group gap-2">
              <span>Rating: {book.averageRating ?? "?"}</span>
              <Star color="orange" fill="yellow" size="25" />
            </div>
            <div className="group gap-2">
              <span>Ratings: {book.ratingsCount ?? "?"}</span>
              <UserRoundSearch color="gray" size="25" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
