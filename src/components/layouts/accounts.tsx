import { Outlet } from "react-router-dom";
import { AccountsSidebar } from "../sidebars/accounts";
import { SidebarProvider } from "../ui/sidebar";
import { Navbar } from "../navbar";

export const AccountsLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AccountsSidebar />
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
