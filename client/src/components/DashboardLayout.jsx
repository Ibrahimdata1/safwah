import { Home, Table, Users, Settings } from "lucide-react";
import SidebarItem from "./SidebarItem";
function DashboardLayout({ children }) {
  return (
    <div className="grid grid-cols-12 min-h-screen ">
      <aside className="col-span-2 bg-[#121212f7] p-4 border-r border-border hidden md:block">
        <div className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-300">
          🧭 Safwah
        </div>
        <nav className="space-y-2">
          <SidebarItem icon={<Home size={18} />} label="Feed" />
          <SidebarItem icon={<Table size={18} />} label="Posts" />
          <SidebarItem icon={<Users size={18} />} label="Users" />
          <SidebarItem icon={<Settings size={18} />} label="Settings" />
        </nav>
      </aside>
      <main className="col-span-8">{children}</main>
      <div className="col-span-2 p-4 hidden md:block text-gray-400 bg-[#121212d8]">
        Empty Now
      </div>
    </div>
  );
}
export default DashboardLayout;
