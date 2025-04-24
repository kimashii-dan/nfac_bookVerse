import { Input } from "./ui/input";

type SearchProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export default function Search({ searchQuery, setSearchQuery }: SearchProps) {
  return (
    <Input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search by name..."
      className="w-3/5"
    />
  );
}
