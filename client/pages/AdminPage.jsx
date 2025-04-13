import PostForm from "@/components/PostForm";
import PostMath from "@/components/PostMatn";
import PostSharh from "@/components/PostSharh";
import PostChapter from "@/components/PostChapter";
function AdminPage() {
  return (
    <div className="bg-[#121212f5] mx-auto min-h-screen">
      <PostForm />
      <PostMath />
      <PostSharh />
      <PostChapter />
    </div>
  );
}
export default AdminPage;
