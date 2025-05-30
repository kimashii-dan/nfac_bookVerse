import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { BookDetailsType, BookType } from "../types";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Check, Loader2, Star, UserRoundSearch } from "lucide-react";
import { addFavorite } from "../helpers/api";
import { toast } from "sonner";
import { useState } from "react";

export default function BookDetailsCard({
  book,
  isFavoritePage,
}: {
  book: BookDetailsType;
  isFavoritePage?: boolean;
}) {
  const { isAuthenticated, removeAuth } = useAuth();
  const [optimisticClicked, setOptimisticClicked] = useState(false);

  const mutation = useMutation({
    mutationFn: addFavorite,
    onMutate: () => {
      setOptimisticClicked(true);
    },
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
      if (error.name === "403") {
        removeAuth();
      }
      setOptimisticClicked(false);

      toast("Submission error", {
        description: error.message,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    },
  });

  function handleAddBook() {
    const formattedBook: BookType = {
      id: book.id,
      title: book.title,
      author: book.author,
      publish_date: book.publish_date,
      image: `https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`,
      average_rating: Number(book.average_rating),
    };

    mutation.mutate(formattedBook);
  }

  return (
    <Card className="my-20 p-4 base:p-10">
      <div className="flex flex-col base:flex-row gap-10">
        <img
          src={book.image || "/placeholder.jpg"}
          alt={book.title}
          className="base:w-[45%] w-full object-cover rounded-lg"
        />

        <div className="base:w-[50%] flex flex-col gap-6">
          <div>
            <h2 className="text-3xl font-semibold">{book.title}</h2>
            <p className="text-lg text-muted-foreground">
              {book.author} • {book.publish_date}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Description</h3>
            <p className="text-muted-foreground my-4">{book.description}</p>
          </div>

          {isAuthenticated && !isFavoritePage && (
            <Button
              className="w-3/5 text-sm base:text-base"
              onClick={() => handleAddBook()}
              disabled={mutation.isPending || optimisticClicked}
            >
              {mutation.isPending ? (
                <Loader2 className="animate-spin" size={18} />
              ) : optimisticClicked ? (
                <>
                  <Check />
                  Added to favorites
                </>
              ) : (
                "Add to favorites"
              )}
            </Button>
          )}

          <div className="flex justify-between mt-auto text-sm base:text-base">
            <div className="group gap-2">
              <span>Rating: {book.average_rating ?? "?"}</span>
              <Star color="orange" fill="yellow" size="25" />
            </div>
            <div className="group gap-2">
              <span>Ratings: {book.ratings_count ?? "?"}</span>
              <UserRoundSearch color="gray" size="25" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
