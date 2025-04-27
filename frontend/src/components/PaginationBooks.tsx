import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "./ui/pagination";

import { RefObject } from "react";
import { useSearch } from "../hooks/useSearch";

export default function PaginationBooks({
  currentPage,
  total_books,
  topRef,
}: {
  currentPage: number;
  total_books: number | undefined;
  topRef: RefObject<HTMLDivElement | null>;
}) {
  const totalPages = (total_books ?? 0) / 6;
  const { setFilters } = useSearch();

  const handlePageChange = (newPage: number) => {
    setFilters({ page: newPage });
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <Pagination className="mb-10">
      <PaginationContent>
        {currentPage !== 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(prevPage)}>
              {prevPage}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink className="" href="#" isActive size={undefined}>
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {currentPage !== totalPages && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(nextPage)}>
              {nextPage}
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
