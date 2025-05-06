import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface ManageDataButtonProps {
  iconBg: string;
  icon: ReactNode;
  label: string;
}

export const ManageDataAddButton = ({
  iconBg,
  icon,
  label,
}: ManageDataButtonProps) => {
  return (
    <Button variant="outline" className="py-7 text-slate-950 space-x-2">
      <div
        className={`w-8 h-8 rounded-sm flex items-center justify-center ${iconBg}`}
      >
        {icon}
      </div>
      <span>{label}</span>
    </Button>
  );
};
