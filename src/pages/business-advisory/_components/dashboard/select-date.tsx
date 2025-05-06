import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { startOfWeek, endOfWeek, subWeeks } from "date-fns";
import { DateRange } from "react-day-picker";

interface SelectDateProps {
  onDateChange: (date: DateRange | undefined) => void;
}

export const SelectDate = ({ onDateChange }: SelectDateProps) => {
  const getThisWeek = (): DateRange => ({
    from: startOfWeek(new Date(), { weekStartsOn: 1 }),
    to: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  const getLastWeek = (): DateRange => {
    const lastWeek = subWeeks(new Date(), 1);
    return {
      from: startOfWeek(lastWeek, { weekStartsOn: 1 }),
      to: endOfWeek(lastWeek, { weekStartsOn: 1 }),
    };
  };

  const [date, setDate] = useState<DateRange>(getThisWeek());
  const [label, setLabel] = useState("This Week");
  const [open, setOpen] = useState(false);

  const handleSelect = (range: DateRange, label: string) => {
    setDate(range);
    setLabel(label);
    onDateChange(range);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-10 text-slate-950 space-x-2">
          <span>{label}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col space-y-2 p-4 w-full">
        <Button
          className="text-slate-950"
          variant={label === "This Week" ? "outline" : "ghost"}
          onClick={() => handleSelect(getThisWeek(), "This Week")}
        >
          This Week
        </Button>
        <Button
          className="text-slate-950"
          variant={label === "Last Week" ? "outline" : "ghost"}
          onClick={() => handleSelect(getLastWeek(), "Last Week")}
        >
          Last Week
        </Button>
      </PopoverContent>
    </Popover>
  );
};
