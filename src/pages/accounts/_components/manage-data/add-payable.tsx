import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddDataModalProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
}

export const AddPayableModal = ({ icon, iconBg, label }: AddDataModalProps) => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [accountPayable, setAccountPayable] = useState<number>();
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [paymentDate, setPaymentDate] = useState<Date | undefined>();
  const [status, setStatus] = useState("Pending");
  const [mode, setMode] = useState("Bank Transfer");
  const [category, setCategory] = useState("Utilities");

  const handleSave = () => {
    // TODO: integrate real submit logic
    console.log({
      invoiceNumber,
      supplierName,
      accountPayable,
      dueDate,
      paymentDate,
      status,
      mode,
      category,
    });
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
            Fill in the details for the new {label.toLowerCase()}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="invoice-number">
              Invoice # <span className="text-rose-500">*</span>
            </Label>
            <Input
              className="h-10"
              id="invoice-number"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              placeholder="Enter invoice number"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplier-name">
              Supplier Name <span className="text-rose-500">*</span>
            </Label>
            <Input
              className="h-10"
              id="supplier-name"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              placeholder="Enter supplier name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="account-payable">
              Account Payable (₦) <span className="text-rose-500">*</span>
            </Label>
            <Input
              className="h-10"
              id="account-payable"
              type="number"
              value={accountPayable ?? ""}
              onChange={(e) => setAccountPayable(Number(e.target.value))}
              placeholder="Enter amount"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">
              Category <span className="text-rose-500">*</span>
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Utilities",
                  "Rent",
                  "Office Supplies",
                  "Services",
                  "Misc",
                ].map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">
              Payment Status <span className="text-rose-500">*</span>
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {["Pending", "Paid", "Overdue"].map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>
              Due Date <span className="text-rose-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full text-left h-10">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : "Select due date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={(date) => {
                    setDueDate(date);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Payment Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full text-left h-10">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {paymentDate
                    ? format(paymentDate, "PPP")
                    : "Select payment date (optional)"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={paymentDate}
                  onSelect={(date) => {
                    setPaymentDate(date);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mode">
              Mode of Payment <span className="text-rose-500">*</span>
            </Label>
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select payment mode" />
              </SelectTrigger>
              <SelectContent>
                {["Bank Transfer", "Cash", "Cheque", "Credit Card"].map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave}>Save Record</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
