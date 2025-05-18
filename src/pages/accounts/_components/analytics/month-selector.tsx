"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

interface MonthSelectorProps {
  allMonths: string[];
  selectedMonths: string[];
  onSelect: (months: string[]) => void;
}

export function MonthSelector({
  allMonths,
  selectedMonths,
  onSelect,
}: MonthSelectorProps) {
  const handleCheckedChange = (month: string, checked: boolean) => {
    if (checked) {
      onSelect([...selectedMonths, month]);
    } else {
      onSelect(selectedMonths.filter((m) => m !== month));
    }
  };

  const selectAll = () => {
    onSelect([...allMonths]);
  };

  const clearAll = () => {
    onSelect([]);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <CalendarIcon className="h-4 w-4" />
          <span>Months</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2">
        <div className="space-y-2">
          <div className="flex justify-between px-2">
            <button
              onClick={selectAll}
              className="text-xs text-primary hover:underline"
            >
              Select all
            </button>
            <button
              onClick={clearAll}
              className="text-xs text-primary hover:underline"
            >
              Clear all
            </button>
          </div>
          <div className="grid grid-cols-1 gap-1">
            {allMonths.map((month) => (
              <div key={month} className="flex items-center space-x-2 p-1">
                <Checkbox
                  id={month}
                  checked={selectedMonths.includes(month)}
                  onCheckedChange={(checked) =>
                    handleCheckedChange(month, checked as boolean)
                  }
                />
                <label
                  htmlFor={month}
                  className="text-sm font-medium leading-none"
                >
                  {month}
                </label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
