import NewsFeed from "@/components/NewsFeed";
import DashboardLayout from "@/components/DashboardLayout";
function Homepage() {
  return (
    <div className="min-h-screen">
      <DashboardLayout>
        <NewsFeed />
      </DashboardLayout>
    </div>
  );
}
export default Homepage;
