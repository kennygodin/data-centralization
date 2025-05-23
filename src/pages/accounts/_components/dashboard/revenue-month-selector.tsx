import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, CalendarIcon } from "lucide-react";

export const MonthSelector = ({
  allMonths,
  selectedMonths,
  onSelect,
}: {
  allMonths: string[];
  selectedMonths: string[];
  onSelect: (months: string[]) => void;
}) => {
  const [open, setOpen] = useState(false);

  const toggleMonth = (month: string) => {
    if (selectedMonths.includes(month)) {
      onSelect(selectedMonths.filter((m) => m !== month));
    } else {
      onSelect([...selectedMonths, month]);
    }
  };

  const selectAll = () => {
    onSelect([...allMonths]);
  };

  const clearAll = () => {
    onSelect([]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-10 text-slate-950 space-x-2">
          <CalendarIcon className="h-4 w-4" />
          <span>
            {selectedMonths.length === allMonths.length
              ? "Months"
              : selectedMonths.length === 1
                ? selectedMonths[0].slice(0, 3)
                : `${selectedMonths.length} selected`}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
        <div className="flex justify-between mb-2 px-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={selectAll}
            className="text-xs h-6"
          >
            Select all
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="text-xs h-6"
          >
            Clear all
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-1">
          {allMonths.map((month) => (
            <Button
              key={month}
              variant="ghost"
              className={`h-8 justify-start text-xs ${
                selectedMonths.includes(month) ? "bg-slate-100" : ""
              }`}
              onClick={() => toggleMonth(month)}
            >
              {selectedMonths.includes(month) && (
                <Check className="mr-2 h-3 w-3" />
              )}
              {month.slice(0, 3)}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
