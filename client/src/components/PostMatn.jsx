import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SelectBooks from "@/components/SelectBooks";
import SelectChapter from "@/components/SelectChapter";
function PostMatn() {
  const [matnText, setMatnText] = useState("");
  const [bookId, setBookId] = useState(null);
  const [selectChapter, setSelectChapter] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `http://localhost:8080/api/books/${bookId}/matn`,
      {
        matnText,
        chapterId: selectChapter,
      }
    );
    if (res.status == 201) {
      alert("Add Matn Successful!");
      setMatnText("");
    } else {
      alert("Error Add Matn && Status axios not 201!");
    }
  };
  const getSelectedBookId = (bookId) => {
    setBookId(bookId);
  };
  return (
    <Card className="w-2xl mx-auto md:mb-12 bg-background text-foreground border border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Add new Matn</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label className="font-medium mb-2">Select Books</Label>
          <SelectBooks getSelectedBookId={getSelectedBookId} />
        </div>
        <div>
          <Label className="font-medium mb-2">Select Chapter</Label>
          <SelectChapter setSelectChapter={setSelectChapter} bookId={bookId} />
        </div>
        <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label className="font-medium">Matn Text</Label>
            <Input
              name="matnText"
              value={matnText}
              onChange={(e) => setMatnText(e.target.value)}
              placeholder="type matn text..."
              required
            />
          </div>
          <Button type="submit" className="w-full cursor-pointer">
            Add Matn
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
export default PostMatn;
