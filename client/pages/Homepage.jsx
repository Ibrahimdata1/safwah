import NewsFeed from "@/components/NewsFeed";
import DashboardLayout from "@/components/DashboardLayout";
import NewThreadsForm from "@/components/NewThreadForm";
function Homepage() {
  return (
    <div className="grid grid-cols-12 min-h-screen">
      <DashboardLayout />
      <NewsFeed />
      <NewThreadsForm />
    </div>
  );
}
export default Homepage;
