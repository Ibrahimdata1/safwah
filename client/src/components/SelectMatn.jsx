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

function truncateMatnText(text, maxLength = 50) {
  if (!text) return "";
  const lines = text.split(/\r?\n/);
  const firstLine = lines[0].trim();
  if (firstLine.length <= maxLength) return firstLine;
  return firstLine.substring(0, maxLength) + "...";
}

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
      <SelectTrigger className="w-[280px] h-auto py-2">
        <SelectValue placeholder="Select a matn" />
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        <SelectGroup>
          {books.map((book) => (
            <div key={book.id} className="mb-2">
              <SelectLabel className="px-2 py-1.5 text-sm font-medium text-gray-300">
                {book.title}
              </SelectLabel>
              {book.matn.map((mt) => (
                <SelectItem
                  key={mt.id}
                  value={JSON.stringify({ id: mt.id, text: mt.matnText })}
                  className="py-2 px-2"
                >
                  <div className="font-vazir text-right" style={{ direction: 'rtl' }}>
                    {truncateMatnText(mt.matnText)}
                  </div>
                </SelectItem>
              ))}
            </div>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectMatn;
