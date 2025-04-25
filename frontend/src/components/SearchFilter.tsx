import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useSearch } from "../hooks/useSearch";
import { SearchParams } from "../types";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function SearchFilter() {
  const { query, searchBy, page, setFilters } = useSearch();

  const [localSearch, setLocalSearch] = useState<SearchParams["query"]>(query);
  const [localFilter, setLocalFilter] =
    useState<SearchParams["searchBy"]>(searchBy);
  const debouncedSearch = useDebounce(localSearch);

  useEffect(() => {
    if (debouncedSearch === "" && !query) return;

    setFilters({ query: debouncedSearch, searchBy: localFilter, page: page });
  }, [debouncedSearch, localFilter, page, query, setFilters]);

  return (
    <div className="centered-row">
      <Input
        type="text"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        placeholder="Search by name..."
        className="w-3/5"
      />
      <Select
        onValueChange={(value) =>
          setLocalFilter(value as SearchParams["searchBy"])
        }
        value={localFilter}
      >
        <SelectTrigger className="w-1/5">
          <SelectValue placeholder="Search by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="font-bold">Search by</SelectLabel>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="author">Author</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
