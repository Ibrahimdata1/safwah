import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import supabase from "../../utils/supabaseClient.js";
function DashboardLayout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) return console.error("authUser not found!");
        const res = await axios.get(
          `http://localhost:8080/api/users/${user.id}`
        );
        setUser(res.data.data);
      } catch (error) {
        console.error("error fetchUserDashboard 500", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  if (loading) {
    return <Loader2 className="mr-2 h-4 animate-spin" />;
  }
  return (
    <SidebarProvider className="col-span-2">
      <AppSidebar user={user} />
    </SidebarProvider>
  );
}
export default DashboardLayout;
