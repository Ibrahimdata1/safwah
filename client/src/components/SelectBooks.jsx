import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import axios from "axios";
function SelectBooks({ getSelectedBookId }) {
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get(`http://localhost:8080/api/books/`);
      const data = res.data.data;
      setBooks(data);
      if (data.length > 0) {
        setSelectedBookId(data[0].id);
      }
    };
    fetchBooks();
  }, []);
  useEffect(() => {
    getSelectedBookId(selectedBookId);
  }, [selectedBookId]);
  return (
    <Select onValueChange={(value) => setSelectedBookId(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a book" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Books</SelectLabel>
          {books.map((book) => (
            <SelectItem key={book.id} value={book.id}>
              {book.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
export default SelectBooks;
