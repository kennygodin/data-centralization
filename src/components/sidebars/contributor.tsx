import {
  Bell,
  Database,
  LayoutDashboard,
  LogOut,
  Search,
  UserRound,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const ContributorSidebar = () => {
  const { pathname } = useLocation();

  const isDashboardActive = pathname.includes("/dashboard");
  const isManageDataActive = pathname.includes("/manage-data");
  const isNotificationActive = pathname.includes("/notification");
  const isAccountActive = pathname.includes("/account");
  return (
    <Sidebar>
      <SidebarHeader className="items-center justify-center py-5">
        <Badge className="text-amber-900 bg-amber-100">Contributor</Badge>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://yt3.googleusercontent.com/OmVF56SkN5MOOiMcpZyLGKrxQPH3xs9sN-xdlSR59bSFQsE_vdDT7Rc_i1t9HHj6WNlwS0hV1w=s176-c-k-c0x00ffffff-no-rj-mo" />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <p className="text-slate-950">Sangam Mukherjee</p>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input className="pl-10 h-10" placeholder="Search..." />
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className={cn(
                "h-10 [&>svg]:w-5 [&>svg]:h-5",
                isDashboardActive && "bg-[#DDE4E9] font-medium text-[#2349BA]"
              )}
              asChild
            >
              <Link to="/contributor/dashboard">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              className={cn(
                "h-10 [&>svg]:w-5 [&>svg]:h-5",
                isManageDataActive && "bg-[#DDE4E9] font-medium text-[#2349BA]"
              )}
              asChild
            >
              <Link to="/contributor/manage-data">
                <Database />
                <span>Manage Data</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              className={cn(
                "h-10 [&>svg]:w-5 [&>svg]:h-5",
                isNotificationActive &&
                  "bg-[#DDE4E9] font-medium text-[#2349BA]"
              )}
              asChild
            >
              <Link to="/contributor/notification">
                <Bell />
                <span>Notification</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              className={cn(
                "h-10 [&>svg]:w-5 [&>svg]:h-5",
                isAccountActive && "bg-[#DDE4E9] font-medium text-[#2349BA]"
              )}
              asChild
            >
              <Link to="/contributor/account">
                <UserRound />
                <span>Account</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="ghost" className="h-10">
          <LogOut />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
