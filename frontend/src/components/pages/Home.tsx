import { useQuery } from "@tanstack/react-query";
import { User } from "../../types";
import { fetchUsers } from "../../helpers/helpers";
import { useState } from "react";
import Search from "../Search";
import Filter from "../Filter";
import UserCardList from "../UserCardList";

export default function Home() {
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filterSelect, setFilterSelect] = useState("all");

  return (
    <div className="container my-12">
      <div className="centered-row">
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Filter
          filterSelect={filterSelect}
          setFilterSelect={setFilterSelect}
          users={users}
        />
      </div>

      {isLoading ? (
        <div className="message-centered">Loading users...</div>
      ) : isError ? (
        <div className="message-centered">
          Error: {(error as Error).message}
        </div>
      ) : (
        <UserCardList
          users={users}
          searchQuery={searchQuery}
          filterSelect={filterSelect}
        />
      )}
    </div>
  );
}
