import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
          image: selectedFile.name,
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
        };
        await axios.post("http://localhost:8080/api/newsFeed", newPost);
        onPost(newPost);
        setTitle("");
        setContent("");
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
    <div className="bg-gray-50 border rounded-xl p-4 mb-10">
      <h2 className="text-lg font-semibold mb-3">📢 Post Your Own Content</h2>
      <Input
        placeholder="Topic"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-3"
      />
      <div className="flex items-center gap-3 mb-3 cursor-pointer">
        <Input type="file" onChange={handleUpload} />
        {selectedFile && (
          <span className="text-gray-700 text-sm truncate max-w-[200px]">
            📎{selectedFile.name}
          </span>
        )}
      </div>
      <Textarea
        placeholder="ContentPost"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mb-3"
      />
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      <Button
        onClick={handlePost}
        className="cursor-pointer flex items-center justifuy-center gap-2"
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="mr-2 h-4 animate-spin" />}
        {isLoading ? "Posting..." : "Post"}
      </Button>
    </div>
  );
}
export default PostForm;
