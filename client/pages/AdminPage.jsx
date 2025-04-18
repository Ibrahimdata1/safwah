import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar-admin";
import { Outlet } from "react-router-dom";

function AdminPage() {
  return (
    <div className="grid grid-cols-12 bg-[#121212f5]">
      <div>
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </div>
      <div className="col-span-10 mt-10">
        <Outlet />
      </div>
    </div>
  );
}
export default AdminPage;
