import { Card, CardContent, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { ThumbsUp, MessageCircle, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
function PostCard({ title, content, image, postId }) {
  const [likes, setLikes] = useState(false);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    const loadComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/newsFeed/${postId}/comments`
        );
        setCommentList(res.data.data);
      } catch (error) {
        console.error("loadComment Error 500", error);
      }
    };
    loadComments();
  }, [postId]);
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      await axios.post(
        `http://localhost:8080/api/newsFeed/${postId}/comments`,
        {
          comment,
        }
      );
      setCommentList((prev) => [...prev, comment]);
      setComment("");
    } catch (error) {
      console.error("comment failed 500!", error);
    }
  };
  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:8080/api/newsFeed/${postId}/likes`);
      setLikes(true);
    } catch (error) {
      console.error("error increase like 500", error);
    }
  };
  return (
    <Card className="hover:shadow-xl transition cursor-pointer bg-gray-900 text-white w-full max-w-2xl mx-auto rounded-2xl shadow-md mb-6">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1744060900~exp=1744064500~hmac=f31564ef625fd23ceb9c722f1cf6b7d99333bb627396f1c8affbe90c2edb20b7&w=900"
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-white">userTest0</p>
            <p className="text-xs text-gray-400">2h ago.</p>
          </div>
        </div>
        <MoreHorizontal className="text-gray-400 cursor-pointer" />
      </div>
      <div className="w-full max-h-[500px] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <CardContent className="p-4">
        <CardTitle className="text-xl font-semibold mb-2">{title}</CardTitle>
        <p className="text-sm text-gray-300 mb-4">{content}</p>
        <div className="flex gap-6 text-sm text-gray-400 border-t border-gray-700 pt-3">
          <Button
            className="flex items-center gap-1 hover:text-green-400 transition cursor-pointer"
            onClick={handleCommentSubmit}
          >
            <MessageCircle size={16} />
            Comment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
export default PostCard;
