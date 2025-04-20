import NewsFeed from "@/components/NewsFeed";
import DashboardLayout from "@/components/DashboardLayout";
import NewThreadsForm from "@/components/NewThreadForm";
import Navbar from "@/components/Navbar";
function Homepage() {
  return (
    <div className=" bg-[#121212f5]">
      <Navbar />
      <div className="grid grid-cols-12 min-h-screen">
        <DashboardLayout />
        <NewsFeed url={"/booksharh"} />
        <NewThreadsForm />
      </div>
    </div>
  );
}
export default Homepage;
