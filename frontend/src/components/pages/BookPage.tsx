import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { fetchBook } from "../../helpers/api";
import BookCardDetails from "../BookCardDetails";
import SkeletonBookPage from "../loadingUI/SkeletonBookPage";

export default function BookPage() {
  const location = useLocation();
  const routePrefix = location.pathname.split("/");

  const route = routePrefix[1];
  const id = routePrefix[2];
  console.log(id);
  const {
    data: book,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBook(id),
    retry: false,
  });

  return (
    <div className="base:max-w-9/12 max-w-11/12 w-full">
      {isLoading ? (
        <SkeletonBookPage />
      ) : isError ? (
        <div className="message-centered">
          Error: {(error as Error).message}
        </div>
      ) : (
        <>
          {book ? (
            <BookCardDetails
              isFavoritePage={route === "favorites" ? true : false}
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
