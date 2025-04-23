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
function SelectMatn({ getSelectMatnId, getSelectMatnText }) {
  const [selectedMatnId, setSelectedMatnId] = useState(null);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get(`http://localhost:8080/api/books/`);
      const data = res.data.data;
      setBooks(data);
      if (data.length > 0) {
        setSelectedMatnId(data[0].id);
      }
    };
    fetchBooks();
  }, []);
  useEffect(() => {
    getSelectMatnId(selectedMatnId);
  }, [selectedMatnId]);
  return (
    <Select
      onValueChange={(value) => {
        const { id, text } = JSON.parse(value);
        setSelectedMatnId(id);
        getSelectMatnText(text);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a matn" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Books</SelectLabel>
          {books.map((book) => (
            <SelectGroup key={book.id}>
              <SelectLabel>{book.title}</SelectLabel>
              {book.matn.map((mt) => (
                <SelectItem
                  key={mt.id}
                  value={JSON.stringify({ id: mt.id, text: mt.matnText })}
                >
                  {mt.matnText}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
export default SelectMatn;
