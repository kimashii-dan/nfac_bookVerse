import { Link } from "react-router-dom";
import { BookListType } from "../types";
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

export default function BookCard({ book }: { book: BookListType }) {
  return (
    <Card>
      <CardHeader className="">
        <CardTitle>
          <h1>{book.title}</h1>
        </CardTitle>
        <CardDescription>
          <h2>{book.author}</h2>
          <h3>{book.date}</h3>
        </CardDescription>
      </CardHeader>

      <CardContent className="centered-column gap-10">
        <img
          src={book.image === "" ? "/placeholder.jpg" : book.image}
          alt={book.title}
          className="w-56 h-80"
        />
        <CardAction className="centered-row">
          <Button>
            <Link to={`/${book.id}`}>View details</Link>
          </Button>
          {book.averageRating && (
            <p className="group gap-2">
              {book.averageRating}
              <Star color="orange" fill="yellow" />
            </p>
          )}
        </CardAction>
      </CardContent>
    </Card>
  );
}
