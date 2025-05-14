import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, AlertTriangle } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import { InternalPaymentEntry } from "@/types/accounts.types";

interface ViewInternalPaymentEntryProps {
  entry: InternalPaymentEntry;
  onSave?: (updatedEntry: InternalPaymentEntry) => Promise<void>;
  onDelete?: () => Promise<void>;
}

export function ViewInternalPaymentEntry({
  entry: initialEntry,
  onSave,
  onDelete,
}: ViewInternalPaymentEntryProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [entry, setEntry] = useState(initialEntry);
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setIsDeleting(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (onSave) await onSave(entry);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save changes:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEntry(initialEntry);
    setIsEditing(false);
    setIsDeleting(false);
  };

  const handleDeleteInitiate = () => {
    setIsDeleting(true);
    setIsEditing(false);
  };

  const handleDeleteConfirm = async () => {
    if (onDelete) {
      try {
        await onDelete();
      } catch (error) {
        console.error("Failed to delete entry:", error);
      }
    }
  };

  const handleChange = (
    field: keyof InternalPaymentEntry,
    value: string | number | Date | boolean
  ) => {
    setEntry((prev) => ({
      ...prev,
      [field]:
        value instanceof Date ? value.toISOString().split("T")[0] : value,
    }));
  };

  const renderEditableField = (
    field: keyof InternalPaymentEntry,
    value: string | number,
    label: string,
    isCurrency = false
  ) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      {!isEditing ? (
        <div className="text-slate-950 p-2 bg-gray-100 rounded h-10">
          {isCurrency ? formatCurrency(value) : value || "-"}
        </div>
      ) : (
        <Input
          value={value?.toString() || ""}
          onChange={(e) =>
            handleChange(
              field,
              typeof value === "number"
                ? Number(e.target.value)
                : e.target.value
            )
          }
          className="h-10"
        />
      )}
    </div>
  );

  const renderEditableSelect = (
    field: keyof InternalPaymentEntry,
    value: string,
    label: string,
    options: string[]
  ) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      {!isEditing ? (
        <div className="text-slate-950 p-2 bg-gray-100 rounded h-10">
          {value || "-"}
        </div>
      ) : (
        <Select
          value={value}
          onValueChange={(newValue) => handleChange(field, newValue)}
        >
          <SelectTrigger className="w-full h-10">
            <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );

  const renderEditableDate = (
    field: keyof InternalPaymentEntry,
    value: string,
    label: string
  ) => {
    const dateValue = value ? new Date(value) : undefined;

    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        {!isEditing ? (
          <div className="text-slate-950 p-2 bg-gray-100 rounded h-10">
            {dateValue ? format(dateValue, "PPP") : "-"}
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full text-left h-10">
                <CalendarDays className="mr-2 h-4 w-4" />
                {dateValue
                  ? format(dateValue, "PPP")
                  : `Select ${label.toLowerCase()}`}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateValue}
                onSelect={(date) => date && handleChange(field, date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
      </div>
    );
  };

  const renderEditableCheckbox = (
    field: keyof InternalPaymentEntry,
    value: boolean,
    label: string
  ) => (
    <div className="flex items-center space-x-2 pt-2 h-10">
      {!isEditing ? (
        <div className="text-slate-950 p-2 bg-gray-100 rounded h-10 flex items-center">
          {value ? "Yes" : "No"}
        </div>
      ) : (
        <>
          <Checkbox
            id={field}
            checked={value}
            onCheckedChange={(checked) => handleChange(field, !!checked)}
          />
          <Label htmlFor={field}>{label}</Label>
        </>
      )}
    </div>
  );

  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          View
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[600px]">
        <SheetHeader className="p-6">
          <SheetTitle className="text-2xl">
            Internal Payment #{entry.id}
          </SheetTitle>
          <SheetDescription className="mt-6">
            <div className="grid grid-cols-2 gap-4">
              {renderEditableField("recipient", entry.recipient, "Recipient")}
              {renderEditableSelect(
                "paymentType",
                entry.paymentType,
                "Payment Type",
                [
                  "Reimbursement",
                  "Advance",
                  "Salary Advance",
                  "Petty Cash",
                  "Other",
                ]
              )}
              {renderEditableField("amount", entry.amount, "Amount", true)}
              {renderEditableSelect(
                "status",
                entry.status || "Approved",
                "Status",
                ["Approved", "Pending", "Rejected"]
              )}
              {renderEditableDate(
                "transactionDate",
                entry.transactionDate,
                "Transaction Date"
              )}
              {renderEditableSelect("mode", entry.mode, "Payment Mode", [
                "Bank Transfer",
                "Cash",
                "Cheque",
                "Credit Card",
                "Online Payment",
              ])}
              {renderEditableField(
                "approvedBy",
                entry.approvedBy || "",
                "Approved By"
              )}
              {renderEditableField(
                "department",
                entry.department || "",
                "Department"
              )}
              {renderEditableCheckbox(
                "receiptAttached",
                entry.receiptAttached,
                "Receipt Attached"
              )}
            </div>
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div className="border-t pt-2">
            <div className="p-6">
              <h3 className="font-medium">Actions</h3>
              <div className="flex gap-2 pt-2">
                {!isEditing && !isDeleting ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-10"
                      onClick={handleEdit}
                    >
                      Edit Entry
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-10"
                      onClick={handleDeleteInitiate}
                    >
                      Delete
                    </Button>
                    <Button variant="outline" size="sm" className="h-10">
                      View History
                    </Button>
                  </>
                ) : isEditing ? (
                  <>
                    <Button
                      variant="default"
                      size="sm"
                      className="h-10 bg-[#2349BA] hover:bg-[#1a3a9b]"
                      onClick={handleSave}
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-10"
                      onClick={handleCancel}
                      disabled={isSaving}
                    >
                      Cancel
                    </Button>
                  </>
                ) : isDeleting ? (
                  <div className="w-full space-y-4 border border-destructive rounded-lg p-4">
                    <div className="flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-5 w-5" />
                      <h4 className="font-semibold">Confirm Deletion</h4>
                    </div>
                    <p className="text-sm">
                      Are you sure you want to delete this internal payment
                      entry? This action cannot be undone.
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="h-10"
                        onClick={handleDeleteConfirm}
                      >
                        Delete Permanently
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-10"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
