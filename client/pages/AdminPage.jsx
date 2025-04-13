import PostForm from "@/components/PostForm";
import PostMath from "@/components/PostMatn";
import PostSharh from "@/components/PostSharh";
function AdminPage() {
  return (
    <div className="bg-[#121212f5] mx-auto min-h-screen">
      <PostForm />
      <PostMath />
      <PostSharh />
    </div>
  );
}
export default AdminPage;
