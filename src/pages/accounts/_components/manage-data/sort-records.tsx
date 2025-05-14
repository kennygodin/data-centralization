import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  CalendarCheck,
  ListFilter,
  User,
  Trash,
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, startOfMonth, endOfMonth } from "date-fns";

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
    label: "Date range",
    value: "date-range",
    icon: <CalendarDays size={16} />,
  },
  {
    label: "My entries",
    value: "my-entries",
    icon: <User size={16} />,
  },
  // {
  //   label: "Edited entries",
  //   value: "edited-entries",
  //   icon: <Pencil size={16} />,
  // },
  {
    label: "Delete",
    value: "delete",
    icon: <Trash size={16} />,
  },
];

interface SortRecordsProps {
  onFilterChange: (filter: {
    type: string;
    dateRange?: { from: Date; to: Date };
  }) => void;
  hasSelectedItems: boolean;
  onDelete?: () => void;
}

export const SortRecords = ({
  onFilterChange,
  hasSelectedItems,
  onDelete,
}: SortRecordsProps) => {
  const [btnState, setBtnState] = useState("all-records");
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>();

  const handleFilterChange = (value: string) => {
    if (value === "delete") {
      if (onDelete && hasSelectedItems) {
        onDelete();
      }
      return;
    }

    setBtnState(value);

    if (value === "this-month") {
      const today = new Date();
      const monthStart = startOfMonth(today);
      const monthEnd = endOfMonth(today);
      onFilterChange({
        type: value,
        dateRange: { from: monthStart, to: monthEnd },
      });
    } else if (value === "date-range" && dateRange) {
      onFilterChange({ type: value, dateRange });
    } else {
      onFilterChange({ type: value });
    }
  };

  const handleDateRangeSelect = (
    range: { from?: Date; to?: Date } | undefined
  ) => {
    if (range?.from && range?.to) {
      const newRange = { from: range.from, to: range.to };
      setDateRange(newRange);
      setBtnState("date-range");
      onFilterChange({ type: "date-range", dateRange: newRange });
    } else if (range?.from) {
      const newRange = { from: range.from, to: range.from };
      setDateRange(newRange);
      setBtnState("date-range");
      onFilterChange({ type: "date-range", dateRange: newRange });
    } else {
      setDateRange(undefined);
      onFilterChange({ type: "all-records" });
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filterOptions.map((option) =>
        option.value === "date-range" ? (
          <Popover key={option.value}>
            <PopoverTrigger asChild>
              <Button
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
                {dateRange && btnState === "date-range" && (
                  <span className="text-xs ml-1">
                    ({format(dateRange.from, "MMM d")} -{" "}
                    {format(dateRange.to, "MMM d")})
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="range"
                selected={{
                  from: dateRange?.from,
                  to: dateRange?.to,
                }}
                onSelect={handleDateRangeSelect}
                numberOfMonths={1}
              />
            </PopoverContent>
          </Popover>
        ) : (
          <Button
            key={option.value}
            onClick={() => handleFilterChange(option.value)}
            variant="ghost"
            className={clsx(
              "flex items-center gap-2 px-4 py-2 text-sm whitespace-nowrap",
              btnState === option.value && option.value !== "delete"
                ? "border border-primary text-primary bg-muted"
                : "border border-transparent text-slate-700",
              option.value === "delete" && !hasSelectedItems
                ? "opacity-50 cursor-not-allowed"
                : option.value === "delete"
                  ? "text-red-500 hover:text-red-600"
                  : ""
            )}
            disabled={option.value === "delete" && !hasSelectedItems}
          >
            {option.icon}
            {option.label}
          </Button>
        )
      )}
    </div>
  );
};
