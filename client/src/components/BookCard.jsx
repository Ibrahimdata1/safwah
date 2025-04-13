import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
function BookCard({ book }) {
  return (
    <Card className="w-full max-w-sm shadow-lg">
      <CardHeader>
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-60 object-cover rounded-md"
        />
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>
        <p className="mt-2 text-sm line-clamp-3">{book.description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link to={`/booksharh/${book.id}`}>Read</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
export default BookCard;
