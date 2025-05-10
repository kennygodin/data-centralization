import { Outlet } from "react-router-dom";
import { AccountsSidebar } from "../sidebars/accounts";
import { SidebarProvider } from "../ui/sidebar";
import { Navbar } from "../navbar";

export const AccountsLayout = () => {
  return (
    <SidebarProvider>
      <AccountsSidebar />
      <main className="w-full">
        <Navbar />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};
