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
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { useState, useEffect } from "react";

type DataType =
  | "salary"
  | "payable"
  | "receivable"
  | "petty-cash"
  | "journal"
  | "financial-statement"
  | "invoice"
  | "internal-payment";

interface AddDataModalProps {
  type: DataType;
  icon: React.ReactNode;
  iconBg: string;
  label: string;
}

function getLastFriday(date = new Date()): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day <= 5 ? 5 - day : 6;
  d.setDate(d.getDate() + diff);
  return d;
}

type InputField = {
  id: string;
  label: string;
  type: "text" | "number" | "date" | "select" | "file";
  required?: boolean;
  options?: string[];
};

const getInputFields = (type: DataType): InputField[] => {
  switch (type) {
    case "salary":
      return [
        {
          id: "employee-first",
          label: "First Name",
          type: "text",
          required: true,
        },
        {
          id: "employee-last",
          label: "Last Name",
          type: "text",
          required: true,
        },
        { id: "role", label: "Role", type: "text", required: true },
        {
          id: "department",
          label: "Department",
          type: "select",
          options: ["Finance", "HR", "IT", "Sales"],
          required: true,
        },
        {
          id: "amount",
          label: "Salary Amount",
          type: "number",
          required: true,
        },
        {
          id: "payment-date",
          label: "Payment Date",
          type: "date",
          required: true,
        },
        { id: "invoice", label: "Invoice #", type: "text" },
        {
          id: "mode",
          label: "Mode of Payment",
          type: "select",
          options: ["Bank Transfer", "Cash", "Cheque"],
          required: true,
        },
        {
          id: "status",
          label: "Payment Status",
          type: "select",
          options: ["Paid", "Pending", "Overdue"],
          required: true,
        },
      ];

    case "payable":
      return [
        { id: "vendor", label: "Vendor Name", type: "text", required: true },
        {
          id: "amount",
          label: "Payable Amount",
          type: "number",
          required: true,
        },
        { id: "due-date", label: "Due Date", type: "date", required: true },
        { id: "payment-date", label: "Payment Date", type: "date" },
        { id: "invoice", label: "Invoice #", type: "text", required: true },
      ];
    case "receivable":
      return [
        { id: "client", label: "Client Name", type: "text", required: true },
        {
          id: "amount",
          label: "Receivable Amount",
          type: "number",
          required: true,
        },
        { id: "due-date", label: "Due Date", type: "date", required: true },
        { id: "payment-date", label: "Payment Date", type: "date" },
        { id: "invoice", label: "Invoice #", type: "text", required: true },
        {
          id: "status",
          label: "Payment Status",
          type: "select",
          options: ["Paid", "Pending", "Overdue"],
          required: true,
        },
        {
          id: "category",
          label: "Category",
          type: "select",
          options: ["Utilities", "Office Supplies", "Services"],
          required: true,
        },
        {
          id: "receipt",
          label: "Upload Receipt/Invoice",
          type: "file",
          required: true,
        },
      ];
    case "petty-cash":
      return [
        { id: "purpose", label: "Purpose", type: "text", required: true },
        { id: "amount", label: "Amount", type: "number", required: true },
        { id: "recipient", label: "Recipient", type: "text", required: true },
      ];
    case "journal":
      return [
        { id: "entry-name", label: "Entry Name", type: "text", required: true },
        {
          id: "debit-account",
          label: "Debit Account",
          type: "text",
          required: true,
        },
        {
          id: "credit-account",
          label: "Credit Account",
          type: "text",
          required: true,
        },
        { id: "amount", label: "Amount", type: "number", required: true },
      ];
    case "financial-statement":
      return [
        {
          id: "statement-type",
          label: "Statement Type",
          type: "select",
          options: ["Balance Sheet", "Income Statement", "Cash Flow"],
          required: true,
        },
        {
          id: "period",
          label: "Reporting Period",
          type: "text",
          required: true,
        },
      ];
    case "invoice":
      return [
        {
          id: "invoice-number",
          label: "Invoice Number",
          type: "text",
          required: true,
        },
        { id: "client", label: "Client Name", type: "text", required: true },
        { id: "amount", label: "Amount", type: "number", required: true },
        { id: "due-date", label: "Due Date", type: "date", required: true },
      ];
    case "internal-payment":
      return [
        {
          id: "from-department",
          label: "From Department",
          type: "text",
          required: true,
        },
        {
          id: "to-department",
          label: "To Department",
          type: "text",
          required: true,
        },
        { id: "amount", label: "Amount", type: "number", required: true },
        { id: "purpose", label: "Purpose", type: "text", required: true },
      ];
    default:
      return [];
  }
};

export const AddDataModal = ({
  type,
  icon,
  iconBg,
  label,
}: AddDataModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [today, setToday] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [paymentDate, setPaymentDate] = useState<Date | undefined>();
  const inputFields = getInputFields(type);

  useEffect(() => {
    setToday(format(new Date(), "PPP"));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Dialog>
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
            {label}
          </DialogTitle>
          <DialogDescription>
            Fill in the details for the new {label.toLowerCase()}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Date</Label>
            <Input value={today} disabled />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {inputFields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>
                  {field.label}
                  {field.required && <span className="text-red-500"> *</span>}
                </Label>
                {field.type === "select" ? (
                  <select
                    id={field.id}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : field.type === "date" ? (
                  <div className="col-span-2 bg-amber-300">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dueDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarDays className="mr-2 h-4 w-4" />
                          {dueDate
                            ? format(dueDate, "PPP")
                            : `Select ${field.label.toLowerCase()}`}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dueDate}
                          onSelect={setDueDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                ) : (
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    required={field.required}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional information"
              className="min-h-[100px]"
            />
          </div>

          {/* <div className="space-y-2">
            <Label>Upload supporting document</Label>
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
          </div> */}

          <div className="flex justify-end gap-2 mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save Record</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
