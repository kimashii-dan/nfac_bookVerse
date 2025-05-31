import { useLocation } from "react-router-dom";
import { BookType } from "../types";
import BookCard from "./BookCard";

export default function BookList({
  books,
  query,
  searchBy,
}: {
  books: BookType[] | null;
  query?: string;
  searchBy?: string;
}) {
  const location = useLocation();

  const hasSearchQuery = query && query.trim().length > 0;
  const isEmptyResults = books === null || books?.length === 0;

  if (hasSearchQuery && isEmptyResults) {
    return (
      <div className="message-centered text-xl text-primary">
        <p>
          {searchBy === "author"
            ? `No authors found with the name of "${query}"`
            : `No books found with the title of "${query}"`}
        </p>
      </div>
    );
  }

  if (isEmptyResults) {
    return (
      <div className="message-centered text-xl flex sm:flex-row flex-col gap-7 align-center justify-center">
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
              className=" w-[150px] animate-fade-in-top"
              alt=""
            />
            <div className="flex flex-col align-center base:text-left text-center  base:gap-2 gap-1 animate-fade-in-bottom">
              <h1 className="font-semibold text-4xl base:text-5xl">
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
