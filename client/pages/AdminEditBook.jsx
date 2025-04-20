import NewsFeed from "@/components/NewsFeed";
function AdminEditBook() {
  return (
    <div className="grid grid-cols-12 min-h-screen bg-[#121212f5]">
      <NewsFeed url={"/admin/books/editbooks"} />
    </div>
  );
}
export default AdminEditBook;
