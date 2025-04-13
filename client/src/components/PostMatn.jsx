import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SelectBooks from "@/components/SelectBooks";
function PostMatn() {
  const [arText, setarText] = useState("");
  const [engText, setengText] = useState("");
  const [bookId, setBookId] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `http://localhost:8080/api/books/${bookId}/matn`,
      {
        arText,
        engText,
      }
    );
    if (res.status == 201) {
      alert("Add Matn Successful!");
      setarText("");
      setengText("");
    } else {
      alert("Error Add Matn && Status axios not 201!");
    }
  };
  const getSelectedBookId = (bookId) => {
    setBookId(bookId);
  };
  return (
    <Card className="max-w-2xl mx-auto mt-10 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl">Add new Matn</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label className="font-medium mb-2">Select Books</Label>
          <SelectBooks getSelectedBookId={getSelectedBookId} />
        </div>
        <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label className="font-medium">Text Arabic</Label>
            <Input
              name="arText"
              value={arText}
              onChange={(e) => setarText(e.target.value)}
              placeholder="type matn arabic..."
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="font-medium">Text English</Label>
            <Input
              name="engText"
              value={engText}
              onChange={(e) => setengText(e.target.value)}
              placeholder="type matn english..."
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
