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

export const AddInternalPaymentModal = ({
  icon,
  iconBg,
  label,
}: AddDataModalProps) => {
  const [transactionDate, setTransactionDate] = useState<Date | undefined>(
    new Date()
  );
  const [recipient, setRecipient] = useState("");
  const [paymentType, setPaymentType] = useState("Reimbursement");
  const [amount, setAmount] = useState<number>();
  const [paymentMode, setPaymentMode] = useState("Bank Transfer");
  const [approvalStatus, setApprovalStatus] = useState("Pending");
  const [approvedBy, setApprovedBy] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    console.log({
      transactionDate,
      recipient,
      paymentType,
      amount,
      paymentMode,
      approvalStatus,
      approvedBy,
      notes,
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
            {label}
          </DialogTitle>
          <DialogDescription>
            Record a new internal payment transaction
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label>
              Transaction Date <span className="text-rose-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full text-left h-10">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {transactionDate
                    ? format(transactionDate, "PPP")
                    : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={transactionDate}
                  onSelect={setTransactionDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipient">
              Recipient Name/Dept <span className="text-rose-500">*</span>
            </Label>
            <Input
              className="h-10"
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter name or department"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentType">
              Payment Type <span className="text-rose-500">*</span>
            </Label>
            <select
              id="paymentType"
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              className="w-full h-10 rounded-md border px-3 text-sm"
            >
              {[
                "Reimbursement",
                "Advance",
                "Salary Advance",
                "Petty Cash",
                "Other",
              ].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">
              Amount (₦) <span className="text-rose-500">*</span>
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
            <Label htmlFor="paymentMode">
              Mode of Payment <span className="text-rose-500">*</span>
            </Label>
            <select
              id="paymentMode"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="w-full h-10 rounded-md border px-3 text-sm"
            >
              {["Bank Transfer", "Cash", "Cheque", "Mobile Money"].map(
                (mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="approvalStatus">
              Approval Status <span className="text-rose-500">*</span>
            </Label>
            <select
              id="approvalStatus"
              value={approvalStatus}
              onChange={(e) => setApprovalStatus(e.target.value)}
              className="w-full h-10 rounded-md border px-3 text-sm"
            >
              {["Pending", "Approved", "Rejected", "On Hold"].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2 space-y-2">
            <Label htmlFor="approvedBy">Approved By</Label>
            <Input
              className="h-10"
              id="approvedBy"
              value={approvedBy}
              onChange={(e) => setApprovedBy(e.target.value)}
              placeholder="Enter approver's name"
              disabled={approvalStatus !== "Approved"}
            />
          </div>

          <div className="col-span-2 space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Input
              className="h-10"
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional information"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave}>Record Payment</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
