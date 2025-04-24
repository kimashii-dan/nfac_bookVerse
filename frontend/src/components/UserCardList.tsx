import { useState } from "react";
import { User } from "../types";
import UserCard from "./UserCard";
import { filterByCity, searchByName } from "../helpers/helpers";
import UserCardModal from "./UserCardModal";

type UserCardListProps = {
  users: User[] | undefined;
  searchQuery: string;
  filterSelect: string;
};

export default function UserCardList({
  users,
  searchQuery,
  filterSelect,
}: UserCardListProps) {
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const handleOpen = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const searchedUsers = searchByName(users, searchQuery);

  const filteredUsers =
    filterSelect === "all"
      ? searchedUsers
      : filterByCity(searchedUsers, filterSelect);

  if (filteredUsers?.length === 0) {
    return <div className="centered-block">No users found.</div>;
  }

  return (
    <>
      <div className="list">
        {filteredUsers?.map((user) => (
          <UserCard key={user.id} user={user} onOpen={handleOpen} />
        ))}
      </div>
      <UserCardModal
        open={open}
        setOpen={setOpen}
        selectedUser={selectedUser}
      />
    </>
  );
}
