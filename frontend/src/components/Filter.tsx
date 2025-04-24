import { User } from "../types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type FilterProps = {
  filterSelect: string;
  setFilterSelect: (query: string) => void;
  users: User[] | undefined;
};

export default function Filter({
  filterSelect,
  setFilterSelect,
  users,
}: FilterProps) {
  const cities = [...new Set(users?.map((user) => user.address.city))];

  return (
    <Select value={filterSelect} onValueChange={setFilterSelect}>
      <SelectTrigger className="w-1/5">
        <SelectValue placeholder="Select a city" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>City</SelectLabel>
          <SelectItem value="all">All cities</SelectItem>
          {cities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
