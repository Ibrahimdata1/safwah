import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import SelectBooks from "@/components/SelectBooks";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
function PostChapter() {
  const navigate = useNavigate();
  const [bookId, setBookId] = useState(null);
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState(null);
  const [chapters, setChapters] = useState([]);
  useEffect(() => {
    if (bookId) {
      const getChapters = async () => {
        await axios
          .get(`http://localhost:8080/api/books/${bookId}/chapters`)
          .then((res) => setChapters(res.data.data))
          .catch((err) => console.error("load Chapters error", err));
      };
      getChapters();
    }
  }, [bookId]);
  const getSelectedBookId = (bookId) => {
    setBookId(bookId);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `http://localhost:8080/api/books/${bookId}/chapters`,
      {
        name,
        parentId,
      }
    );
    if (res.status == 201) {
      alert("Create Chapter Successful!");
      setName("");
      setParentId(null);
      const updatedChapters = await axios.get(`http://localhost:8080/api/books/${bookId}/chapters`);
      setChapters(updatedChapters.data.data);
    } else {
      alert("Create Chapter Faild 500!");
    }
  };
  return (
    <Card className="w-2xl mx-auto md:mb-12 bg-background text-foreground border border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Add new Chapter</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label className="font-medium mb-2">Select Books</Label>
          <SelectBooks getSelectedBookId={getSelectedBookId} />
        </div>
        <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label className="font-medium">Parent Chapter (Optional)</Label>
            <Select
              value={parentId}
              onValueChange={(value) => setParentId(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a matn" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Parent Chapter</SelectLabel>
                  <SelectItem value={null}>--None (Root Chapter)--</SelectItem>
                  {chapters.map((chapter) => (
                    <SelectItem key={chapter.id} value={chapter.id}>
                      {chapter.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="font-medium">Chapter Name</Label>
            <Input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Chapter Name"
              required
            />
          </div>
          <Button type="submit" className="w-full cursor-pointer">
            Add Chapter
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
export default PostChapter;
