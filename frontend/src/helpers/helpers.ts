import { User } from "../types";

async function fetchUsers(): Promise<User[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

function searchByName(users: User[] | undefined, query: string) {
  return users?.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );
}

function filterByCity(users: User[] | undefined, filterSelect: string) {
  return users?.filter(
    (user) => user.address.city.toLowerCase() === filterSelect.toLowerCase()
  );
}

export { fetchUsers, searchByName, filterByCity };
