import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../../helpers/api";
import BookList from "../BookList";
import SkeletonBookList from "../loadingUI/SkeletonBookList";

export default function Favorites() {
  const {
    data: books,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["favoriteBooks"],
    queryFn: () => getFavorites(),
    retry: false,
  });

  const reversedBooks = books ? [...books].reverse() : [];

  return (
    <div className="container my-12">
      {isLoading && <SkeletonBookList />}

      {isSuccess && <BookList books={reversedBooks} />}
    </div>
  );
}
