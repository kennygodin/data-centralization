import { Download, Trash, UserRoundPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AddUserModal } from "./add-users";

const options = [
  {
    label: "Add User",
    value: "add-user",
    icon: <UserRoundPlus size={16} />,
    iconColor: "text-white",
    bgColor: "bg-[#2CAA5D]",
    disabled: false,
  },
  {
    label: "Export CSV",
    value: "export",
    icon: <Download size={16} />,
    bgColor: "bg-[#AA2C7C]",
    iconColor: "text-white",
    disabled: false,
  },
  {
    label: "Delete",
    value: "delete",
    icon: <Trash size={16} />,
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
    disabled: true, // Will be enabled when rows are selected
  },
];

export const TableActions = () => {
  return (
    <div className="flex items-center gap-2">
      <AddUserModal />

      {options
        .filter((opt) => opt.value !== "add-user")
        .map((option) => (
          <Button
            key={option.value}
            variant={option.value === "delete" ? "ghost" : "outline"}
            className={cn(
              "flex items-center gap-2 py-7",
              option.disabled && "opacity-50 cursor-not-allowed"
            )}
            disabled={option.disabled}
            onClick={() => console.log(option.value)}
          >
            <span
              className={cn("p-2 rounded-md", option.bgColor, option.iconColor)}
            >
              {option.icon}
            </span>
            {option.label}
          </Button>
        ))}
    </div>
  );
};
