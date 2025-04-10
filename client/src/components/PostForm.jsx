import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
function PostForm({ onPost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handlePost = async () => {
    if (!title || !content) {
      setError("Title and Content Cannot be empty!");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        await axios.post(
          "http://localhost:8080/api/newsFeed/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const newPost = {
          title,
          content,
          image: `http://localhost:8080/uploads/${selectedFile.name}`,
          type: "users",
        };
        const res = await axios.post(
          "http://localhost:8080/api/newsFeed",
          newPost
        );
        onPost(res.data.data);
        setTitle("");
        setContent("");
        setSelectedFile(null);
      } else {
        const newPost = {
          title,
          content,
          type: "users",
        };
        await axios.post("http://localhost:8080/api/newsFeed", newPost);
        onPost(newPost);
        setTitle("");
        setContent("");
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("error newsFeed 500", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setSelectedFile(file);
    } catch (error) {
      console.error("error upload pic 500", error);
    }
  };
  return (
    <Card className="w-full bg-background text-foreground border border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Post Your Own Content</CardTitle>
        <CardDescription className="text-md">
          write something useful.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                placeholder="Set up your topic..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="upload">Upload</Label>
              <Input id="upload" type="file" onChange={handleUpload} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Textarea
                placeholder="Say somethings..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                row="4"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={handlePost}
          disabled={isLoading}
          className="cursor-pointer"
        >
          {isLoading && <Loader2 className="mr-2 h-4 animate-spin" />}
          {isLoading ? "Posting..." : "Post"}
        </Button>
      </CardFooter>
    </Card>
  );
}
export default PostForm;
