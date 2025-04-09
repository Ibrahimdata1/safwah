import { Home, Table, Users, Settings } from "lucide-react";
import SidebarItem from "./SidebarItem";
import NewThreadForm from "./NewThreadForm";
function DashboardLayout({ children }) {
  return (
    <div className="grid grid-cols-12 min-h-screen ">
      <aside className="col-span-2 bg-[#121212f7] p-4 border-r border-border hidden md:block">
        <div className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-300">
          🧭 Safwah
        </div>
        <nav className="space-y-2">
          <SidebarItem icon={<Home size={18} />} label="Feed" link="/" />
          <SidebarItem icon={<Table size={18} />} label="Posts" link="/posts" />
          <SidebarItem icon={<Users size={18} />} label="Users" link="users" />
          <SidebarItem
            icon={<Settings size={18} />}
            label="Settings"
            link="settings"
          />
        </nav>
      </aside>
      <main className="col-span-8">{children}</main>
      <aside className="col-span-2 p-4 hidden md:block text-gray-400 bg-[#121212f7]">
        <NewThreadForm />
      </aside>
    </div>
  );
}
export default DashboardLayout;
