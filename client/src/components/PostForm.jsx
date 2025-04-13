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
function PostForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handlePost = async () => {
    if (!title || !author) {
      setError("Title and Author Cannot be empty!");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        await axios.post("http://localhost:8080/api/books/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const newBook = {
          title,
          author,
          description,
          coverUrl: `http://localhost:8080/uploads/${selectedFile.name}`,
        };
        await axios.post("http://localhost:8080/api/books", newBook);
        setTitle("");
        setAuthor("");
        setDescription("");
        setSelectedFile(null);
      } else {
        const newBook = {
          title,
          author,
          description,
        };
        await axios.post("http://localhost:8080/api/books", newBook);
        onPost();
        setTitle("");
        setAuthor("");
        setDescription("");
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
    <Card className="w-2xl mx-auto md:mb-12 bg-background text-foreground border border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Add New Book for Admin</CardTitle>
        <CardDescription className="text-md">
          add new book to newsFeed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="topic">Title</Label>
              <Input
                id="title"
                placeholder="book title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                placeholder="author name..."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="coverUrl">Upload</Label>
              <Input id="coverUrl" type="file" onChange={handleUpload} />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="author">Description</Label>
              <Textarea
                id="description"
                placeholder="book description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
