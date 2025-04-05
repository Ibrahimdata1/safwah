import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
function Homepage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white py-10 px-4 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">
          🕌 Safwa Feed – Muslim News
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Muslim Community pure religion clean society.
        </p>
        <div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-xl transition cursor-pointer">
            <CardContent className="p-5">
              <CardTitle className="text-lg font-semibold mb-2">
                🕋 Hajj news
              </CardTitle>
              <p className="text-sm text-gray-500">
                Saudi announced ready to welcome Hujjaj 2 millions people this
                year and prepare AI
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-xl transition cursor-pointer">
            <CardContent className="p-5">
              <CardTitle className="text-lg font-semibold mb-2">
                🕌 Building Masjid
              </CardTitle>
              <p className="text-sm text-gray-500">
                Project Building in West Africa next month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="text-center mt-10">
          <Button
            className="text-lg px-6 py-2 cursor-pointer"
            onClick={() => navigate("/newsfeed")}
          >
            Go to Feed
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Homepage;
