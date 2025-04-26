import { useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "./ui/pagination";

import { RefObject } from "react";

export default function PaginationBooks({
  currentPage,
  baseUrl,
  totalBooks,
  topRef,
}: {
  currentPage: number;
  totalBooks: number | undefined;
  baseUrl: string;
  topRef: RefObject<HTMLDivElement | null>;
}) {
  const navigate = useNavigate();
  const totalPages = (totalBooks ?? 0) / 6;

  const handlePageChange = (newPage: number) => {
    navigate(`${baseUrl}&page=${newPage}`);
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
