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
    (filters: SearchParams) => {
      setSearchParams((params) => {
        if (filters.query !== undefined && filters.query !== "") {
          params.set("query", filters.query);

          if (filters.searchBy) {
            params.set("searchBy", filters.searchBy);
          }
          if (filters.page) {
            params.set("page", filters.page.toString());
          }
        } else {
          params.delete("query");
          params.delete("searchBy");
          params.delete("page");
        }

        return params;
      });
    },
    [setSearchParams]
  );

  return {
    query,
    searchBy,
    page,
    setFilters,
  };
}
