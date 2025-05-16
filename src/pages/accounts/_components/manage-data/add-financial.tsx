import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";

interface AddDataModalProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
}

export const AddFinancialStatementModal = ({
  icon,
  iconBg,
  label,
}: AddDataModalProps) => {
  const [reportType, setReportType] = useState("Income Statement");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [totalRevenue, setTotalRevenue] = useState<number>();
  const [totalExpenses, setTotalExpenses] = useState<number>();
  const [netProfitLoss, setNetProfitLoss] = useState<number>();
  const [generatedBy, setGeneratedBy] = useState("");
  const [approvedBy, setApprovedBy] = useState("");

  useEffect(() => {
    if (totalRevenue !== undefined && totalExpenses !== undefined) {
      setNetProfitLoss(totalRevenue - totalExpenses);
    }
  }, [totalRevenue, totalExpenses]);

  const handleSave = () => {
    console.log({
      reportType,
      periodCovered: {
        start: startDate,
        end: endDate,
      },
      totalRevenue,
      totalExpenses,
      netProfitLoss,
      generatedBy,
      approvedBy,
    });
    // TODO: Add API integration here
  };

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="py-7 text-slate-950 space-x-2 min-w-[250px] justify-start"
        >
          <div
            className={`w-8 h-8 rounded-sm flex items-center justify-center ${iconBg} text-white`}
          >
            {icon}
          </div>
          <span>{label}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg} text-white`}
            >
              {icon}
            </div>
            New {label}
          </DialogTitle>
          <DialogDescription>
            Create a new financial statement
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          {/* Report Type Select */}
          <div className="col-span-2 space-y-2">
            <Label htmlFor="reportType">
              Report Type <span className="text-rose-500">*</span>
            </Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Income Statement",
                  "Balance Sheet",
                  "Cash Flow Statement",
                  "Statement of Changes in Equity",
                ].map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>
              State Date <span className="text-rose-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full text-left h-10">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Start Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label>
              End Date <span className="text-rose-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full text-left h-10">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : "End Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalRevenue">
              Total Revenue (₦) <span className="text-rose-500">*</span>
            </Label>
            <Input
              className="h-10"
              id="totalRevenue"
              type="number"
              value={totalRevenue ?? ""}
              onChange={(e) => setTotalRevenue(Number(e.target.value))}
              placeholder="Enter total revenue"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalExpenses">
              Total Expenses (₦) <span className="text-rose-500">*</span>
            </Label>
            <Input
              className="h-10"
              id="totalExpenses"
              type="number"
              value={totalExpenses ?? ""}
              onChange={(e) => setTotalExpenses(Number(e.target.value))}
              placeholder="Enter total expenses"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="netProfitLoss">Net Profit/Loss (₦)</Label>
            <Input
              id="netProfitLoss"
              type="number"
              value={netProfitLoss ?? ""}
              onChange={(e) => setNetProfitLoss(Number(e.target.value))}
              placeholder="Calculated automatically"
              readOnly
              className="bg-gray-100 h-10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="generatedBy">
              Generated By <span className="text-rose-500">*</span>
            </Label>
            <Input
              className="h-10"
              id="generatedBy"
              value={generatedBy}
              onChange={(e) => setGeneratedBy(e.target.value)}
              placeholder="Enter name"
              required
            />
          </div>
          <div className="col-span-2 space-y-2">
            <Label htmlFor="approvedBy">Approved By</Label>
            <Input
              className="h-10"
              id="approvedBy"
              value={approvedBy}
              onChange={(e) => setApprovedBy(e.target.value)}
              placeholder="Enter approver's name"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave}>Generate Statement</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
