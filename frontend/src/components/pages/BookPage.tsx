import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchBook } from "../../helpers/api";
import BookCardDetails from "../BookCardDetails";

export default function BookPage() {
  const { favorites, id } = useParams();
  const {
    data: book,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBook(id),
  });

  return (
    <div className="smaller-container">
      {isLoading ? (
        <div className="message-centered">Loading book...</div>
      ) : isError ? (
        <div className="message-centered">
          Error: {(error as Error).message}
        </div>
      ) : (
        <>
          {book ? (
            <BookCardDetails
              isFavoritePage={favorites ? true : false}
              book={book}
            />
          ) : (
            <div className="message-centered">Book not found</div>
          )}
        </>
      )}
    </div>
  );
}
