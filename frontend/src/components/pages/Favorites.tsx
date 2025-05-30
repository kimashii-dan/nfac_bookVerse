import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../../helpers/api";
import BookList from "../BookList";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import SkeletonBookList from "../loadingUI/SkeletonBookList";

export default function Favorites() {
  const {
    data: books,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["favoriteBooks"],
    queryFn: () => getFavorites(),
    retry: false,
  });

  const { removeAuth } = useAuth();
  const reversedBooks = books ? [...books].reverse() : [];

  useEffect(() => {
    if (isError) {
      if (error.name === "403") {
        removeAuth();
      }
    }
  }, [error?.name, isError, removeAuth]);

  return (
    <div className="container my-12">
      {isLoading ? (
        <SkeletonBookList />
      ) : isError ? (
        <div className="message-centered">
          Error: {(error as Error).message}
        </div>
      ) : (
        <BookList books={reversedBooks} />
      )}
    </div>
  );
}
