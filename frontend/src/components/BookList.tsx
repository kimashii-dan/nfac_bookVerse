import { useLocation } from "react-router-dom";
import { BookType } from "../types";
import BookCard from "./BookCard";

export default function BookList({
  books,
  query,
  searchBy,
}: {
  books: BookType[] | null | undefined;
  query?: string;
  searchBy?: string;
}) {
  const location = useLocation();

  const hasSearchQuery = query && query.trim().length > 0;
  const isEmptyResults = books === null || books?.length === 0;

  if (hasSearchQuery && isEmptyResults) {
    return (
      <div className="message-centered text-xl text-primary">
        {searchBy
          ? `No books found with "${query}" in ${searchBy}`
          : `No books found matching "${query}"`}
      </div>
    );
  }

  if (isEmptyResults) {
    return <div className="message-centered">Start exploring books!</div>;
  }

  return (
    <div className="list">
      {books?.map((book: BookType) => (
        <BookCard key={book.id} book={book} path={location.pathname} />
      ))}
    </div>
  );
}
