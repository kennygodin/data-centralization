import { Outlet } from "react-router-dom";
import { BusinessAdvisorySidebar } from "../sidebars/contributor";
import { SidebarProvider } from "../ui/sidebar";
import { Navbar } from "../navbar";

export const BusinessAdvisoryLayout = () => {
  return (
    <SidebarProvider>
      <BusinessAdvisorySidebar />
      <main className="w-full">
        <Navbar />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};
