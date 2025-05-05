import { Outlet } from "react-router-dom";
import { ContributorSidebar } from "../sidebars/contributor";
import { SidebarProvider } from "../ui/sidebar";
import { Navbar } from "../navbar";

export const ContributorLayout = () => {
  return (
    <SidebarProvider>
      <ContributorSidebar />
      <main className="w-full">
        <Navbar />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};
