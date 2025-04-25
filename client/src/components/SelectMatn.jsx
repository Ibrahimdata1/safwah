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

function truncateMatnText(text, maxLength = 100) {
  if (!text) return "";
  const lines = text.split(/\r?\n/);
  const firstLine = lines[0].trim();
  
  // If there are multiple lines, show first two lines
  if (lines.length > 1) {
    const secondLine = lines[1]?.trim() || "";
    const combinedText = `${firstLine} ${secondLine}`;
    if (combinedText.length <= maxLength) return combinedText;
    return combinedText.substring(0, maxLength) + "...";
  }
  
  // If only one line
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
      <SelectTrigger className="w-[400px] h-auto py-2 text-right">
        <SelectValue placeholder="Select a matn" />
      </SelectTrigger>
      <SelectContent className="max-h-[400px] min-w-[400px]">
        <SelectGroup>
          {books.map((book) => (
            <div key={book.id} className="mb-4">
              <SelectLabel className="px-2 py-2 text-base font-medium text-gray-300 border-b border-gray-700">
                {book.title}
              </SelectLabel>
              {book.matn.map((mt, index) => (
                <SelectItem
                  key={mt.id}
                  value={JSON.stringify({ id: mt.id, text: mt.matnText })}
                  className="py-3 px-3 hover:bg-gray-800/50 cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs text-gray-400">#{index + 1}</span>
                    </div>
                    <div className="font-vazir text-right" style={{ direction: 'rtl' }}>
                      {truncateMatnText(mt.matnText)}
                    </div>
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
