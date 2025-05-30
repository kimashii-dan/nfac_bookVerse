import { useQuery } from "@tanstack/react-query";
import SearchFilter from "../SearchFilter";
import { useSearch } from "../../hooks/useSearch";
import PaginationBooks from "../PaginationBooks";
import { fetchBooks } from "../../helpers/api";
import { useRef } from "react";
import BookList from "../BookList";
import SkeletonBookList from "../loadingUI/SkeletonBookList";

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
    <div className="container my-12">
      <div ref={topRef}>
        <SearchFilter />
      </div>
      {query && (
        <p className="text-primary my-5 text-sm text-end">
          Found {booksData?.total_books} results for "{query}"
        </p>
      )}

      {isLoading ? (
        <SkeletonBookList />
      ) : isError ? (
        <div className="message-centered">
          Error: {(error as Error).message}
        </div>
      ) : (
        <BookList searchBy={searchBy} query={query} books={booksData?.books} />
      )}

      {booksData?.books !== null && (
        <PaginationBooks
          total_books={booksData?.total_books}
          currentPage={page}
          topRef={topRef}
        />
      )}
    </div>
  );
}
