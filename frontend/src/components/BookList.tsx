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
    return (
      <div className="message-centered text-xl flex flex-row gap-7 align-center justify-center">
        {location.pathname === "/favorites" ? (
          <div className="flex flex-col justify-center">
            <p>
              You don't have favorite books <u>yet</u>
            </p>
          </div>
        ) : (
          <>
            <img
              src="/book-verse.svg"
              className="base:w-[130px] w-[80px] animate-fade-in-top"
              alt=""
            />
            <div className="flex flex-col align-center base:gap-2 gap-1 animate-fade-in-bottom">
              <h1 className="font-semibold text-2xl base:text-5xl">
                Book Verse
              </h1>
              <p>Start exploring books!</p>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="list">
      {books?.map((book: BookType) => (
        <BookCard key={book.id} book={book} path={location.pathname} />
      ))}
    </div>
  );
}
