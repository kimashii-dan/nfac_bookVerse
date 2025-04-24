import { User } from "../types";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type UserCardProps = {
  user: User;
  onOpen: (user: User) => void;
};

export default function UserCard({ user, onOpen }: UserCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1>{user.name}</h1>
        </CardTitle>
        <CardDescription>
          <h2>{user.username}</h2>
          <h3>{user.email}</h3>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p>
          {user.address.city} - {user.address.street}
        </p>
        <p>{user.phone}</p>

        <h3>{user.company.name}</h3>

        <CardAction>
          <Button onClick={() => onOpen(user)}>View details</Button>
        </CardAction>
      </CardContent>
    </Card>
  );
}
