import { useQuery } from "@tanstack/react-query";
import SearchFilter from "../SearchFilter";
import { useSearch } from "../../hooks/useSearch";
import PaginationBooks from "../PaginationBooks";
import { fetchBooks } from "../../helpers/api";
import { useRef } from "react";
import BookList from "../BookList";

export default function Home() {
  const { query, searchBy, page } = useSearch();

  const {
    data: booksData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["booksData", query, searchBy, page],
    queryFn: () => fetchBooks({ query, searchBy, page }),
  });

  const topRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={topRef} className="container my-12">
      <SearchFilter />

      {isLoading ? (
        <div className="message-centered">Loading books...</div>
      ) : isError ? (
        <div className="message-centered">
          Error: {(error as Error).message}
        </div>
      ) : (
        <BookList books={booksData?.books} />
      )}

      {booksData?.books !== null && (
        <PaginationBooks
          baseUrl={`/?query=${query}&searchBy=${searchBy}`}
          totalBooks={booksData?.totalBooks}
          currentPage={page}
          topRef={topRef}
        />
      )}
    </div>
  );
}
