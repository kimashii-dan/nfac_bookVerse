import { BookListType } from "../types";
import BookCard from "./BookCard";

export default function BookList({
  books,
}: {
  books: BookListType[] | null | undefined;
}) {
  return (
    <>
      {!books ? (
        <div className="message-centered">Placeholder</div>
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
