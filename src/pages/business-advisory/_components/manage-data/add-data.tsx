import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Upload, CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { useState, useEffect } from "react";

type DataType = "income" | "client" | "prospect";

interface AddDataModalProps {
  type: DataType;
  icon: React.ReactNode;
  iconBg: string;
  label: string;
}

function getLastFriday(date = new Date()): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday
  const diff = day <= 5 ? 5 - day : 6; // Calculate days until next Friday
  d.setDate(d.getDate() + diff);
  return d;
}

export const AddDataModal = ({
  type,
  icon,
  iconBg,
  label,
}: AddDataModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [date, setDate] = useState<Date | undefined>();

  useEffect(() => {
    setDate(getLastFriday());
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="py-7 text-slate-950 space-x-2">
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
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#E0EEF9] text-slate-950">
              {icon}
            </div>
            Add new {type}
          </DialogTitle>
          <DialogDescription>
            Fill in the details for the new {type} record for this week
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="weekEnding">Week ending date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select week ending"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">
              {type === "income"
                ? "Income amount"
                : type === "client"
                  ? "Number of clients"
                  : "Number of prospects"}
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder={
                type === "income"
                  ? "Enter amount"
                  : type === "client"
                    ? "Enter number of clients"
                    : "Enter number of prospects"
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Supporting notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional information"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Upload document</Label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    TXT, DOCX, PDF, JPEG, PNG, XLSX, CSV - Up to 50MB
                  </p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {file && (
              <p className="text-sm text-gray-600 mt-2">
                Selected file: {file.name}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save {type}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
