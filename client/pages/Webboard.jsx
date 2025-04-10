import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import ThreadList from "@/components/ThreadList";
import supabase from "../utils/supabaseClient";
function Webboard() {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [threads, setThreads] = useState([]);
  const fetchThread = async () => {
    const res = await axios.get("http://localhost:8080/api/allThreads");
    setThreads(res.data.data);
    console.log("fetchThreads", res.data.data);
  };
  useEffect(() => {
    fetchThread();
  }, []);
  const handlePost = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) return console.error("user error!");
      console.log("userIdCreateThread", user.id);
      await axios.post("http://localhost:8080/api/allThreads", {
        topic,
        content,
        userId: user.id,
      });
      setTopic("");
      setContent("");
      await fetchThread();
    } catch (error) {
      console.error("post thread failed 500", error);
    }
  };
  return (
    <div>
      <div className="p-4 rounded-lg">
        <h3 className="text-white text-lg font-semibold mb-4 justify-center flex">
          New Thread
        </h3>
        <Input
          placeholder="Thread Topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-2 rounded mb-2 text-white bg-gray-700"
        />
        <Textarea
          placeholder="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white mb-2"
          rows={3}
        />
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
          onClick={handlePost}
          disabled={!topic || !content}
        >
          Post Thread
        </Button>
      </div>
      <ThreadList threads={threads} />
    </div>
  );
}
export default Webboard;
