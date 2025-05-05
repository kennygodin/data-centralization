import { Badge } from "./ui/badge";
import { SidebarTrigger } from "./ui/sidebar";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between border-b p-2">
      <div className="flex items-center">
        <SidebarTrigger />
        {/* <h1 className="text-2xl text-slate-950 mb-4">Dashboard</h1> */}
      </div>
      <Badge className="px-4 py-2" variant="outline">
        Business Advisory
      </Badge>
    </div>
  );
};
