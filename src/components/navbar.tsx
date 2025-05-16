import { useLocation } from "react-router-dom";
import { Badge } from "./ui/badge";
import { useSidebar } from "./ui/sidebar";
import { Layers } from "lucide-react";

export const Navbar = () => {
  const { pathname } = useLocation();
  const { toggleSidebar } = useSidebar();

  const sbu = pathname.split("/")[1];
  return (
    <nav className="flex items-center sticky top-0 bg-background z-10 justify-between border-b py-4 px-6">
      <div className="flex gap-2 items-center">
        <Layers onClick={toggleSidebar} size={25} />
        {/* <SidebarTrigger /> */}
        <span className="text-xl">Data Centralization</span>
      </div>
      <Badge className="px-4 py-2 capitalize" variant="outline">
        {sbu}
      </Badge>
    </nav>
  );
};
