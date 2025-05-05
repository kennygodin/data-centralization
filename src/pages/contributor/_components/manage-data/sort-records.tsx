import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  CalendarCheck,
  ListFilter,
  Pencil,
  User,
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const filterOptions = [
  {
    label: "All records",
    value: "all-records",
    icon: <ListFilter size={16} />,
  },
  {
    label: "This month",
    value: "this-month",
    icon: <CalendarCheck size={16} />,
  },
  {
    label: "This week",
    value: "this-week",
    icon: <CalendarDays size={16} />,
  },
  {
    label: "My entries",
    value: "my-entries",
    icon: <User size={16} />,
  },
  {
    label: "Edited entries",
    value: "edited-entries",
    icon: <Pencil size={16} />,
  },
];

export const SortRecords = () => {
  const [btnState, setBtnState] = useState("all-records");

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filterOptions.map((option) => (
        <Button
          key={option.value}
          onClick={() => setBtnState(option.value)}
          variant="ghost"
          className={clsx(
            "flex items-center gap-2 px-4 py-2 text-sm whitespace-nowrap",
            btnState === option.value
              ? "border border-primary text-primary bg-muted"
              : "border border-transparent text-slate-700"
          )}
        >
          {option.icon}
          {option.label}
        </Button>
      ))}
    </div>
  );
};
