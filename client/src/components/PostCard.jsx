import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { ThumbsUp, MessageCircle, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import supabase from "../../utils/supabaseClient";
function PostCard({ title, content, image, postId }) {
  const [likes, setLikes] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comment, setComment] = useState("");
  const [toggleComment, setToggleComment] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const loadComments = async () => {
      try {
        const [
          comments,
          countLikes,
          {
            data: { user },
            error,
          },
        ] = await Promise.all([
          axios.get(`http://localhost:8080/api/newsFeed/${postId}/comments`),
          axios.get(`http://localhost:8080/api/newsFeed/${postId}/likes`),
          supabase.auth.getUser(),
        ]);
        setCommentList(comments.data.data);
        setLikesCount(countLikes.data.data);
        if (error) return console.error("error user");
        const isLiked = await axios.get(
          `http://localhost:8080/api/newsFeed/${postId}/likes/is-liked`,
          {
            params: { userId: user.id },
          }
        );
        setLikes(isLiked.data.data);
      } catch (error) {
        console.error("loadComment Error 500", error);
      }
    };
    loadComments(commentList);
  }, [postId]);
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (!comment.trim() || error) {
      console.log("No comment or error user");
      return;
    }
    try {
      await axios.post(
        `http://localhost:8080/api/newsFeed/${postId}/comments`,
        {
          comment,
          postId,
          userId: user.id,
        }
      );
      const res = await axios.get(
        `http://localhost:8080/api/newsFeed/${postId}/comments`
      );
      setCommentList(res.data.data);
      setToggleComment(true);
      setComment("");
    } catch (error) {
      console.error("comment failed 500!", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleLike = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) return console.error("error like", error);
      await axios.post(`http://localhost:8080/api/newsFeed/${postId}/likes`, {
        userId: user.id,
      });
      const likesCount = await axios.get(
        `http://localhost:8080/api/newsFeed/${postId}/likes`
      );
      setLikesCount(likesCount.data.data);
      setLikes((prev) => !prev);
    } catch (error) {
      console.error("error increase like 500", error);
    }
  };
  const showComment = async () => {
    setToggleComment((prev) => !prev);
    const res = await axios.get(
      `http://localhost:8080/api/newsFeed/${postId}/comments`
    );
    setCommentList(res.data.data);
  };
  return (
    <Card className="hover:shadow-xl transition cursor-pointer bg-[#1f2937] text-white w-full mx-auto rounded-2xl border border-gray-600 shadow-md mb-6">
      <CardHeader className="flex flex-row items-center justify-between px- pt-5">
        <div className="flex items-center gap-3">
          <img
            src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1744060900~exp=1744064500~hmac=f31564ef625fd23ceb9c722f1cf6b7d99333bb627396f1c8affbe90c2edb20b7&w=900"
            alt="avatar"
            className="w-10 h-10 rounded-full border border-gray-500"
          />
          <div>
            <p className="font-semibold text-white">userTest0</p>
            <p className="text-xs text-gray-400">2h ago.</p>
          </div>
        </div>
        <MoreHorizontal className="text-gray-400 cursor-pointer hover:text-gray-200" />
      </CardHeader>
      <div className="w-full max-h-[500px] overflow-hidden mt-4 m-4 mx-auto px-6">
        <img
          src={image}
          alt={title}
          className="w-full h-full max-h-[400px] rounded-md object-cover"
        />
      </div>
      <CardContent className="px-5 pb-5">
        <CardTitle className="text-xl font-semibold mb-2">{title}</CardTitle>
        <CardDescription className="text-sm mb-4 text-gray-300">
          {content}
        </CardDescription>
        <div className="flex flex-col mt-4 gap-4 text-sm text-gray-400 border-t border-gray-700 pt-3">
          <form className="space-y-4" onSubmit={handleCommentSubmit}>
            <Textarea
              placeholder="Write Your Comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className="resize-none flex-1 bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2"
              rows={2}
            />
            <Button
              type="submit"
              disabled={isLoading || !comment}
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium h-fit mt-1 px-4 py-2"
            >
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </form>
          <div className="flex items-center gap-6 border-t border-gray-700 pt-4">
            <Button
              onClick={handleLike}
              className={`flex items-center gap-1 px-2 py-1 transition cursor-pointer ${
                likes ? "text-blue-500" : "text-gray-400 hover:text-blue-400"
              }`}
              variant="ghost"
            >
              <ThumbsUp
                size={16}
                className={`${likes ? "text-blue-500" : "text-gray-400"}`}
              />
              <span className="font-medium text-white">{likesCount}</span>
              <span className="text-gray-400 hidden sm:inline">likes</span>
            </Button>
            <Button
              className="flex items-center gap-1 hover:text-green-400 transition cursor-pointer"
              onClick={showComment}
              variant="ghost"
            >
              <MessageCircle size={16} />
              <span>Comment</span>
            </Button>
          </div>
        </div>
        {toggleComment && (
          <div className="space-y-2">
            {commentList.map((cmt, index) => (
              <div
                key={index}
                className="bg-gray-800 text-sm text-white p-3 rounded-xl"
              >
                {cmt.comment}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
export default PostCard;
