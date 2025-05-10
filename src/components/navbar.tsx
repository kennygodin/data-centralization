import { useLocation } from "react-router-dom";
import { Badge } from "./ui/badge";
import { SidebarTrigger } from "./ui/sidebar";

export const Navbar = () => {
  const { pathname } = useLocation();

  const sbu = pathname.split("/")[1];
  return (
    <div className="flex items-center justify-between border-b p-2">
      <div className="flex items-center">
        <SidebarTrigger />
      </div>
      <Badge className="px-4 py-2 capitalize" variant="outline">
        {sbu}
      </Badge>
    </div>
  );
};
