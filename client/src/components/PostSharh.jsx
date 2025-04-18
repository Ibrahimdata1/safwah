import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SelectMatn from "@/components/SelectMatn";
function PostSharh() {
  const navigate = useNavigate();
  const [matnId, setMatnId] = useState(null);
  const [text, setText] = useState("");
  const [arExplain, setarExplain] = useState("");
  const [engExplain, setengExplain] = useState("");
  const [scholar, setScholar] = useState("");
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
        arExplain,
        engExplain,
        scholar,
      }
    );
    if (res.status == 201) {
      alert(`Add new Sharh for matn:${text}`);
      setarExplain("");
      setengExplain("");
      setScholar("");
      navigate(0);
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
            <Label className="font-medium">Sharh Arabic</Label>
            <Input
              name="arExplain"
              value={arExplain}
              onChange={(e) => setarExplain(e.target.value)}
              placeholder="type arabic sharh ..."
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="font-medium">Sharh English</Label>
            <Input
              name="engExplain"
              value={engExplain}
              onChange={(e) => setengExplain(e.target.value)}
              placeholder="type english sharh..."
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="font-medium">Scholar Name</Label>
            <Input
              name="scholar"
              value={scholar}
              onChange={(e) => setScholar(e.target.value)}
              placeholder="type scholar name for this sharh ..."
              required
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
