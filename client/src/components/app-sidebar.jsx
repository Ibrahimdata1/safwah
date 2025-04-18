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

export function AppSidebar({ user }) {
  if (!user) return null;
  const data = {
    user: {
      name: user.name,
      email: user.email,
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Home",
        url: "/",
        icon: Home,
        isActive: true,
      },
      {
        title: "Webboard",
        url: "/webboard",
        icon: Bot,
      },
      {
        title: "Marketplace",
        url: "/market",
        icon: BookOpen,
        items: [
          {
            title: "Musharakah",
            url: "/market/musharakah",
          },
          {
            title: "Mudarabah",
            url: "/market/mudarabah",
          },
          {
            title: "Murabahah",
            url: "/market/murabahah",
          },
          {
            title: "Sadaqah",
            url: "/market/sadaqah",
          },
        ],
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "/settings",
          },
          {
            title: "Team",
            url: "/settings/team",
          },
          {
            title: "Profile",
            url: "/settings/profile",
          },
          {
            title: "Display",
            url: "/settings/display",
          },
        ],
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
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
