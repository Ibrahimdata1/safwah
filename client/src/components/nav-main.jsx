import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar";

export function NavMain({ items }) {
  return (
    <SidebarGroup className="w-full">
      <SidebarGroupLabel className="flex items-center justify-between">
        <h2 className="border-b mt-15 pb-2 font-extrabold bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent text-3xl tracking-tight">
          Safwah
        </h2>
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            {item.items ? (
              <Collapsible
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <div>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem
                          key={subItem.title}
                          className="cursor-pointer"
                        >
                          <SidebarMenuSubButton asChild>
                            <Link to={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ) : (
              <SidebarMenuButton asChild tooltip={item.title} className="">
                <Link
                  to={item.url}
                  className="flex items-center mt-3 gap-2 w-full"
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
