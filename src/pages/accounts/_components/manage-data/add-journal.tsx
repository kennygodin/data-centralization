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
import { Textarea } from "@/components/ui/textarea";
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

export const AddJournalModal = ({ icon, iconBg, label }: AddDataModalProps) => {
  const [entryType, setEntryType] = useState("Debit");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [amount, setAmount] = useState<number>();
  const [accountName, setAccountName] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [enteredBy, setEnteredBy] = useState("");
  const [approvedBy, setApprovedBy] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    console.log({
      entryType,
      description,
      date,
      amount,
      accountName,
      referenceNumber,
      enteredBy,
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
            New {label}
          </DialogTitle>
          <DialogDescription>Create a new journal entry</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="entryType">
              Entry Type <span className="text-rose-500">*</span>
            </Label>
            <select
              id="entryType"
              value={entryType}
              onChange={(e) => setEntryType(e.target.value)}
              className="w-full h-10 rounded-md border px-3 text-sm"
            >
              {["Debit", "Credit", "Adjustment", "Reversal"].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>
              Date <span className="text-rose-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full text-left h-10">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
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

          <div className="col-span-2 space-y-2">
            <Label htmlFor="description">
              Description <span className="text-rose-500">*</span>
            </Label>
            <Input
              className="h-10"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter journal description"
              required
            />
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
            <Label htmlFor="accountName">
              Account Name <span className="text-rose-500">*</span>
            </Label>
            <Input
              className="h-10"
              id="accountName"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Enter account name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="referenceNumber">Reference Number</Label>
            <Input
              className="h-10"
              id="referenceNumber"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              placeholder="Enter reference number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="enteredBy">
              Entered By <span className="text-rose-500">*</span>
            </Label>
            <Input
              className="h-10"
              id="enteredBy"
              value={enteredBy}
              onChange={(e) => setEnteredBy(e.target.value)}
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

          <div className="col-span-2 space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional information"
              className="min-h-[100px]"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave}>Post Journal Entry</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
