import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import SelectBooks from "@/components/SelectBooks";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
function PostChapter() {
  const [bookId, setBookId] = useState(null);
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState(null);
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
        order: 1,
      }
    );
    if (res.status == 201) {
      alert("Create Chapter Successful!");
      setName("");
      setParentId(null);
    } else {
      alert("Create Chapter Faild 500!");
    }
  };
  return (
    <Card className="max-w-2xl mx-auto mt-10 shadow-xl">
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
            <Label className="font-medium">Chapter Name</Label>
            <Input
              name="name"
              value={name}
              onChange={(e) => setChapter(e.target.value)}
              placeholder="type arabic sharh ..."
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
