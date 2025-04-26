import { BookListType } from "../types";
import BookCard from "./BookCard";

export default function BookList({
  books,
}: {
  books: BookListType[] | null | undefined;
}) {
  return (
    <>
      {!books || books.length === 0 ? (
        <div className="message-centered text-xl text-primary">
          Start exploring books!
        </div>
      ) : (
        <div className="list">
          {books.map((book: BookListType) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </>
  );
}
