import { Outlet } from "react-router-dom";
import { BusinessAdvisorySidebar } from "../sidebars/business-advisory";
import { SidebarProvider } from "../ui/sidebar";
import { Navbar } from "../navbar";

export const BusinessAdvisoryLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <BusinessAdvisorySidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-auto p-4">
            <div className="max-w-full overflow-x-hidden">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
