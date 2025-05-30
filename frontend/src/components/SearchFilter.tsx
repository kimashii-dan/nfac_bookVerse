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
  const { query, searchBy, setFilters } = useSearch();

  const [localSearch, setLocalSearch] = useState<SearchParams["query"]>(query);
  const [localFilter, setLocalFilter] =
    useState<SearchParams["searchBy"]>(searchBy);
  const debouncedSearch = useDebounce(localSearch);

  useEffect(() => {
    if (debouncedSearch === query && localFilter === searchBy) return;
    setFilters({ query: debouncedSearch, searchBy: localFilter });
  }, [debouncedSearch, localFilter, query, searchBy, setFilters]);

  return (
    <div className="centered-row">
      <Input
        type="text"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        placeholder="Search by name..."
        className="w-8/12"
      />
      <Select
        onValueChange={(value) =>
          setLocalFilter(value as SearchParams["searchBy"])
        }
        value={localFilter}
      >
        <SelectTrigger className="w-3/12 cursor-pointer">
          <SelectValue placeholder="Search by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="font-bold">Search by</SelectLabel>
            <SelectItem className="cursor-pointer" value="title">
              Title
            </SelectItem>
            <SelectItem className="cursor-pointer" value="author">
              Author
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
