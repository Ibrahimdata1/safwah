import NewsFeed from "@/components/NewsFeed";
import DashboardLayout from "@/components/DashboardLayout";
import NewThreadsForm from "@/components/NewThreadForm";
import Navbar from "@/components/Navbar";
function Homepage() {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-12 min-h-screen">
        <DashboardLayout />
        <NewsFeed />
        <NewThreadsForm />
      </div>
    </div>
  );
}
export default Homepage;
