import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../../helpers/api";
import BookList from "../BookList";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function Favorites() {
  const {
    data: books,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["favoriteBooks"],
    queryFn: () => getFavorites(),
  });

  const { removeAuth } = useAuth();

  console.log(books);

  useEffect(() => {
    if (isError) {
      removeAuth();
    }
  }, [isError, removeAuth]);

  return (
    <div className="container my-12">
      {isLoading ? (
        <div className="message-centered">Loading books...</div>
      ) : isError ? (
        <div className="message-centered">
          Error: {(error as Error).message}
        </div>
      ) : (
        <BookList books={books} />
      )}
    </div>
  );
}
