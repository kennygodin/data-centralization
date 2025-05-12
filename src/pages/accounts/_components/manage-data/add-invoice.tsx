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

export const AddInvoiceModal = ({ icon, iconBg, label }: AddDataModalProps) => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [dateIssued, setDateIssued] = useState<Date | undefined>();
  const [clientVendorName, setClientVendorName] = useState("");
  const [totalAmount, setTotalAmount] = useState<number>();
  const [taxAmount, setTaxAmount] = useState<number>();
  const [paymentTerms, setPaymentTerms] = useState("Net 30");
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [status, setStatus] = useState("Pending");
  const [paymentDate, setPaymentDate] = useState<Date | undefined>();
  const [paymentMode, setPaymentMode] = useState("Bank Transfer");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (dateIssued && paymentTerms) {
      const days = parseInt(paymentTerms.replace(/\D/g, "")) || 0;
      const newDueDate = new Date(dateIssued);
      newDueDate.setDate(newDueDate.getDate() + days);
      setDueDate(newDueDate);
    }
  }, [dateIssued, paymentTerms]);

  const handleSave = () => {
    console.log({
      invoiceNumber,
      dateIssued,
      clientVendorName,
      totalAmount,
      taxAmount,
      paymentTerms,
      dueDate,
      status,
      paymentDate,
      paymentMode,
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
            New {label}
          </DialogTitle>
          <DialogDescription>Create a new invoice record</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="invoiceNumber">
              Invoice Number <span className="text-rose-500">*</span>
            </Label>
            <Input
              className="h-10"
              id="invoiceNumber"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              placeholder="INV-0001"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>
              Date Issued <span className="text-rose-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full text-left h-10">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {dateIssued ? format(dateIssued, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateIssued}
                  onSelect={setDateIssued}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientVendorName">
              Client/Vendor Name <span className="text-rose-500">*</span>
            </Label>
            <Input
              className="h-10"
              id="clientVendorName"
              value={clientVendorName}
              onChange={(e) => setClientVendorName(e.target.value)}
              placeholder="Enter name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentTerms">
              Payment Terms <span className="text-rose-500">*</span>
            </Label>
            <select
              id="paymentTerms"
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
              className="w-full h-10 rounded-md border px-3 text-sm"
            >
              {["Net 7", "Net 15", "Net 30", "Net 60", "Due on Receipt"].map(
                (term) => (
                  <option key={term} value={term}>
                    {term}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalAmount">
              Total Amount (₦) <span className="text-rose-500">*</span>
            </Label>
            <Input
              className="h-10"
              id="totalAmount"
              type="number"
              value={totalAmount ?? ""}
              onChange={(e) => setTotalAmount(Number(e.target.value))}
              placeholder="Enter amount"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxAmount">Tax Amount (₦)</Label>
            <Input
              className="h-10"
              id="taxAmount"
              type="number"
              value={taxAmount ?? ""}
              onChange={(e) => setTaxAmount(Number(e.target.value))}
              placeholder="Enter tax amount"
            />
          </div>

          <div className="space-y-2">
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full text-left h-10">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {dueDate
                    ? format(dueDate, "PPP")
                    : "Calculated automatically"}
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

          <div className="space-y-2">
            <Label htmlFor="status">
              Status <span className="text-rose-500">*</span>
            </Label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full h-10 rounded-md border px-3 text-sm"
            >
              {[
                "Pending",
                "Paid",
                "Overdue",
                "Partially Paid",
                "Cancelled",
              ].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Payment Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full text-left h-10">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {paymentDate
                    ? format(paymentDate, "PPP")
                    : "Select date (optional)"}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0"
                align="start"
                onInteractOutside={(e) => e.preventDefault()}
              >
                <Calendar
                  mode="single"
                  selected={paymentDate}
                  onSelect={setPaymentDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMode">Mode of Payment</Label>
            <select
              id="paymentMode"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="w-full h-10 rounded-md border px-3 text-sm"
            >
              {[
                "Bank Transfer",
                "Cash",
                "Cheque",
                "Credit Card",
                "Online Payment",
              ].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
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
          <Button onClick={handleSave}>Save Invoice</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
