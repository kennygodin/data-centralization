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

interface AddDataModalProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
}

export const AddSalaryModal = ({ icon, iconBg, label }: AddDataModalProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("Finance");
  const [paymentDate, setPaymentDate] = useState<Date | undefined>();
  const [amount, setAmount] = useState<number>();
  const [invoice, setInvoice] = useState("");
  const [mode, setMode] = useState("Bank Transfer");
  const [status, setStatus] = useState("Paid");

  const handleSave = () => {
    // TODO: replace with real submit logic
    console.log({
      firstName,
      lastName,
      role,
      department,
      amount,
      paymentDate,
      invoice,
      mode,
      status,
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
            <Label htmlFor="employee-first">
              First Name <span className="text-rose-500">*</span>
            </Label>
            <Input
              className="h-10"
              id="employee-first"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="employee-last">
              Last Name <span className="text-rose-500">*</span>
            </Label>
            <Input
              className="h-10"
              id="employee-last"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">
              Role <span className="text-rose-500">*</span>
            </Label>
            <Input
              className="h-10"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Enter role"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">
              Department <span className="text-rose-500">*</span>
            </Label>
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full h-10 rounded-md border px-3 text-sm"
            >
              {["Finance", "HR", "IT", "Sales"].map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="invoice">Invoice #</Label>
            <Input
              className="h-10"
              id="invoice"
              value={invoice}
              onChange={(e) => setInvoice(e.target.value)}
              placeholder="Enter invoice number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mode">
              Mode of Payment <span className="text-rose-500">*</span>
            </Label>
            <select
              id="mode"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full h-10 rounded-md border px-3 text-sm"
            >
              {["Bank Transfer", "Cash", "Cheque"].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">
              Salary Amount (₦) <span className="text-rose-500">*</span>
            </Label>
            <Input
              className="h-10"
              id="amount"
              type="number"
              value={amount ?? ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">
              Payment Status <span className="text-rose-500">*</span>
            </Label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full h-10 rounded-md border px-3 text-sm"
            >
              {["Paid", "Pending", "Overdue"].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2 space-y-2">
            <Label>
              Payment Date <span className="text-rose-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full text-left h-10">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {paymentDate
                    ? format(paymentDate, "PPP")
                    : "Select payment date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={paymentDate}
                  onSelect={(date) => {
                    setPaymentDate(date);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
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
