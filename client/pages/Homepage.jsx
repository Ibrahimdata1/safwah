import NewsFeed from "@/components/NewsFeed";
import { useNavigate } from "react-router-dom";
function Homepage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-800 py-10 px-4 md:px-12">
      <div className="max-w-5xl mx-auto">
        <NewsFeed />
      </div>
    </div>
  );
}
export default Homepage;
