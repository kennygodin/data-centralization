import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { startOfYear, endOfYear, setMonth } from "date-fns";

interface PeriodSelectorProps {
  onPeriodChange: (period: {
    label: string;
    range: { from: Date; to: Date };
  }) => void;
  initialPeriod: {
    label: string;
    range: { from: Date; to: Date };
  };
}

export const PeriodSelector = ({
  onPeriodChange,
  initialPeriod,
}: PeriodSelectorProps) => {
  const currentYear = new Date().getFullYear();

  const getPeriodRange = (startMonth: number, endMonth: number) => {
    const from = setMonth(
      startOfYear(new Date(currentYear, 0, 1)),
      startMonth - 1
    );
    const to = setMonth(endOfYear(new Date(currentYear, 11, 31)), endMonth - 1);
    return { from, to };
  };

  const periods = [
    {
      label: "January - June",
      range: getPeriodRange(1, 6),
    },
    {
      label: "July - December",
      range: getPeriodRange(7, 12),
    },
  ];

  const [selectedPeriod, setSelectedPeriod] = useState(initialPeriod);
  const [open, setOpen] = useState(false);

  const handleSelect = (period: (typeof periods)[0]) => {
    setSelectedPeriod(period);
    onPeriodChange(period);
    setOpen(false);
    console.log("Selected period:", period);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-10 text-slate-950 space-x-2">
          <span>{selectedPeriod.label}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col space-y-2 p-4 w-full">
        {periods.map((period) => (
          <Button
            key={period.label}
            className="text-slate-950"
            variant={
              selectedPeriod.label === period.label ? "outline" : "ghost"
            }
            onClick={() => handleSelect(period)}
          >
            {period.label}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
