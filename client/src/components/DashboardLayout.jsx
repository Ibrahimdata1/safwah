import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import supabase from "../../utils/supabaseClient.js";
function DashboardLayout() {
  const [user, setUser] = useState(null);
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
      }
    };
    fetchUser();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
    </SidebarProvider>
  );
}
export default DashboardLayout;
