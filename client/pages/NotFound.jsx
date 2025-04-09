import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page Not Found</p>
      <Button
        onClick={() => navigate("/")}
        className="text-base px-6 py-2 rounded-xl"
      >
        Go back home
      </Button>
    </div>
  );
}
export default NotFound;
