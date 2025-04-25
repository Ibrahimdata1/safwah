import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SelectMatn from "@/components/SelectMatn";
function PostSharh() {
  const [matnId, setMatnId] = useState(null);
  const [text, setText] = useState("");
  const [sharhText, setSharhText] = useState("");
  const [scholar, setScholar] = useState("");
  const [footnoteText, setFootnoteText] = useState("");
  const getSelectMatnId = (matnId) => {
    setMatnId(matnId);
  };
  const getSelectMatnText = (matnText) => {
    setText(matnText);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `http://localhost:8080/api/books/${matnId}/sharh`,
      {
        sharhText,
        scholar,
        footnoteText,
      }
    );
    if (res.status == 201) {
      alert(`Add new Sharh for matn:${text}`);
      setSharhText("");
      setFootnoteText("");
    } else {
      alert("Error Add Sharh && Status axios not 201!");
    }
  };
  return (
    <Card className="w-2xl mx-auto md:mb-12 bg-background text-foreground border border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Add new Sharh</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label className="font-medium mb-2">Select Matn</Label>
          <SelectMatn
            getSelectMatnId={getSelectMatnId}
            getSelectMatnText={getSelectMatnText}
          />
        </div>
        <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label className="font-medium">Scholar Name</Label>
            <Input
              name="scholar"
              value={scholar}
              onChange={(e) => setScholar(e.target.value)}
              placeholder="Enter scholar name (e.g., Sheikh Fawzan)"
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-medium">Text Sharh</Label>
            <div className="mb-2 text-sm text-gray-500">
              Format: Arabic text followed by two newlines, then English translation
            </div>
            <Textarea
              name="sharhText"
              value={sharhText}
              onChange={(e) => setSharhText(e.target.value)}
              placeholder="Type Arabic text followed by English translation..."
              required
              className="w-full p-4 border rounded-md font-mono whitespace-pre-wrap min-h-[300px] leading-relaxed"
              style={{
                direction: 'rtl',
                textAlign: 'right',
                lineHeight: '2',
                fontFamily: 'var(--font-vazirmatn), monospace'
              }}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-medium">Footnote (optional)</Label>
            <Textarea
              name="footnote"
              value={footnoteText}
              onChange={(e) => setFootnoteText(e.target.value)}
              placeholder="Type footnote text..."
              className="w-full p-4 border rounded-md font-mono whitespace-pre-wrap"
              style={{
                direction: 'rtl',
                textAlign: 'right',
                lineHeight: '2',
                fontFamily: 'var(--font-vazirmatn), monospace'
              }}
            />
          </div>
          
          <Button type="submit" className="w-full cursor-pointer">
            Add Sharh
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
export default PostSharh;
