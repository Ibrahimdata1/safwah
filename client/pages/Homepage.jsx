import NewsFeed from "@/components/NewsFeed";
import { useNavigate } from "react-router-dom";
function Homepage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#121212e0]">
      <NewsFeed />
    </div>
  );
}
export default Homepage;
