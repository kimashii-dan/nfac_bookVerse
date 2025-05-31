import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchParams } from "../types";

export function useSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = (searchParams.get("query") as SearchParams["query"]) || "";
  const searchBy =
    (searchParams.get("searchBy") as SearchParams["searchBy"]) || "title";
  const page = parseInt(searchParams.get("page") as string) || 1;

  const setFilters = useCallback(
    (filters: Partial<SearchParams>) => {
      const params = new URLSearchParams(searchParams.toString());

      //SEARCH PARAMETERS BUSINESS LOGIC

      // if user inputs nothing, just exit
      if (filters.query === "") {
        setSearchParams(new URLSearchParams());
        return;
      }

      // if user inputs something, set other parameters to their default values
      if (filters.query !== undefined) {
        params.set("query", filters.query);
        params.set("searchBy", filters.searchBy || searchBy);
        params.set("page", "1");

        // if "search by" parameter changes and there is a query in the input, set it to the changed "search by" and reset the page
      } else if (filters.searchBy !== undefined && query) {
        params.set("searchBy", filters.searchBy);
        params.set("page", "1");
      }

      // if only "page" parameter changes, just set it to the changed "page"
      if (
        filters.page !== undefined &&
        filters.query === undefined &&
        filters.searchBy === undefined
      ) {
        params.set("page", String(filters.page));
      }

      // put all parameters into URL
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
