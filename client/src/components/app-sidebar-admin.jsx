import * as React from "react";
import { BookOpen, Bot, Settings2, Home } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const data = {
    navMain: [
      {
        title: "Add New Book for Admin",
        url: "/admin/books",
        icon: Home,
        isActive: true,
      },
      {
        title: "Add New Chapter",
        url: "/admin/books/postchapter",
        icon: Settings2,
      },
      {
        title: "Add New Matn",
        url: "/admin/books/postmatn",
        icon: Bot,
      },
      {
        title: "Add New Sharh",
        url: "/admin/books/postsharh",
        icon: BookOpen,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
