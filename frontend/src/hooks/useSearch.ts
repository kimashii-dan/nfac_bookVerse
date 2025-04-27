import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchParams } from "../types";

export function useSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = (searchParams.get("query") as SearchParams["query"]) || "";
  const searchBy =
    (searchParams.get("searchBy") as SearchParams["searchBy"]) || "title";
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page") as string)
    : 1;

  const setFilters = useCallback(
    (filters: Partial<SearchParams>) => {
      const params = new URLSearchParams(searchParams.toString());

      if (filters.query === "") {
        setSearchParams(new URLSearchParams());
        return;
      }

      if (filters.query !== undefined) {
        params.set("query", filters.query);
        params.set("searchBy", filters.searchBy || searchBy);
        params.set("page", "1");
      } else if (filters.searchBy !== undefined && query) {
        params.set("searchBy", filters.searchBy);
        params.set("page", "1");
      }

      if (
        filters.page !== undefined &&
        filters.query === undefined &&
        filters.searchBy === undefined
      ) {
        params.set("page", String(filters.page));
      }

      setSearchParams(params);
    },
    [searchParams, searchBy, query, setSearchParams]
  );

  return {
    query,
    searchBy,
    page,
    setFilters,
  };
}
