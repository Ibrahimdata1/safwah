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
    <div className="bg-gray-50 border text-black rounded-xl p-4 mb-10">
      <h2 className="text-lg font-semibold mb-3">📢 Post Your Own Content</h2>
      <Input
        placeholder="Topic"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 placeholder-gray-400"
      />
      <div className="flex items-center gap-3 mb-3 mt-3 cursor-pointer">
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
        className="w-full px-4 py-2 mb-3 bg-gray-800 text-white rounded-lg border border-gray-600 placeholder-gray-400"
        row="4"
      />
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      <Button
        onClick={handlePost}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 cursor-pointer rounded-lg transition"
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="mr-2 h-4 animate-spin" />}
        {isLoading ? "Posting..." : "Post"}
      </Button>
    </div>
  );
}
export default PostForm;
