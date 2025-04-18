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
function SelectChapter({ bookId, setSelectChapter }) {
  const [chapters, setChapters] = useState([]);
  useEffect(() => {
    if (!bookId) return;
    const fetchChapters = async () => {
      const chapters = await axios.get(
        `http://localhost:8080/api/books/${bookId}/chapters`
      );
      setChapters(chapters.data.data);
    };
    fetchChapters();
  }, [bookId]);
  return (
    <Select onValueChange={(value) => setSelectChapter(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a book" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Chapters</SelectLabel>
          {chapters.map((chapter) => (
            <SelectItem key={chapter.id} value={chapter.id}>
              {chapter.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
export default SelectChapter;
