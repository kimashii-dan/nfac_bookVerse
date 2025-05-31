import { Link } from "react-router-dom";
import { BookType } from "../types";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Star } from "lucide-react";

export default function BookCard({
  book,
  path,
}: {
  book: BookType;
  path: string;
}) {
  const urlToBook =
    path === "/favorites" ? `/favorites/${book.id}` : `/books/${book.id}`;

  return (
    <Card className="max-w-[500px] mx-auto w-full h-full flex flex-col justify-between">
      <CardHeader>
        <CardTitle>
          <h1 className="text-2xl">{book.title}</h1>
        </CardTitle>
        <CardDescription>
          <h2>
            {book.author} • {book.publish_date}
          </h2>
        </CardDescription>
      </CardHeader>

      <CardContent className="centered-column gap-10">
        <img
          src={book.image || "/placeholder.jpg"}
          alt={book.title}
          className="w-56 h-80 object-cover rounded-sm"
        />
        <CardAction className="centered-row">
          <Button asChild>
            <Link to={urlToBook}>View details</Link>
          </Button>
          <div className="group gap-2">
            {book.average_rating ? book.average_rating : "?"}
            <Star color="orange" fill="yellow" />
          </div>
        </CardAction>
      </CardContent>
    </Card>
  );
}
