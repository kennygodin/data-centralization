import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { AlertTriangle, CalendarDays } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { formatCurrency } from "@/lib/utils";
import { SalaryEntry } from "@/types/accounts.types";

interface ViewSalaryEntryProps {
  entry: SalaryEntry;
  onSave?: (updatedEntry: SalaryEntry) => Promise<void>;
  onDelete?: () => Promise<void>;
}

export function ViewSalaryEntry({
  entry: initialEntry,
  onSave,
  onDelete,
}: ViewSalaryEntryProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [entry, setEntry] = useState(initialEntry);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (onSave) {
        await onSave(entry);
      }
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

  const handleChange = (
    field: keyof SalaryEntry,
    value: string | number | Date
  ) => {
    setEntry((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderEditableField = (
    field: keyof SalaryEntry,
    value: string | number,
    label: string,
    isCurrency = false
  ) => {
    return (
      <div className="space-y-2">
        <Label htmlFor={field}>{label}</Label>
        {!isEditing ? (
          <div className="text-slate-950 h-10 p-2 bg-gray-100 rounded">
            {isCurrency ? formatCurrency(value) : value}
          </div>
        ) : (
          <Input
            id={field}
            type={typeof value === "number" ? "number" : "text"}
            value={value}
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
  };

  const renderEditableSelect = (
    field: keyof SalaryEntry,
    value: string,
    label: string,
    options: string[]
  ) => {
    return (
      <div className="space-y-2">
        <Label htmlFor={field}>{label}</Label>
        {!isEditing ? (
          <div className="text-slate-950 h-10 p-2 bg-gray-100 rounded">
            {value}
          </div>
        ) : (
          <Select
            value={value}
            onValueChange={(newValue) => handleChange(field, newValue)}
          >
            <SelectTrigger className="w-full h-10">
              <SelectValue placeholder="Select an option" />
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

  const renderEditableDate = (
    field: keyof SalaryEntry,
    value: string,
    label: string
  ) => {
    const dateValue = value ? new Date(value) : undefined;

    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        {!isEditing ? (
          <div className="text-slate-950 h-10 p-2 bg-gray-100 rounded">
            {dateValue ? format(dateValue, "PPP") : "Not set"}
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full text-left h-10">
                <CalendarDays className="mr-2 h-4 w-4" />
                {dateValue ? format(dateValue, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateValue}
                onSelect={(date) =>
                  date && handleChange(field, date.toISOString())
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
      </div>
    );
  };

  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          View
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[600px]">
        <SheetHeader className="p-6">
          <SheetTitle className="text-2xl">Salary Entry #{entry.id}</SheetTitle>
          <SheetDescription className="mt-6">
            <div className="grid grid-cols-2 gap-4">
              {renderEditableField("firstName", entry.firstName, "First Name")}
              {renderEditableField("lastName", entry.lastName, "Last Name")}
              {renderEditableField("role", entry.role, "Role")}
              {renderEditableSelect(
                "department",
                entry.department,
                "Department",
                ["Finance", "HR", "IT", "Sales"]
              )}
              {renderEditableField(
                "salaryAmount",
                entry.salaryAmount,
                "Salary Amount",
                true
              )}
              {renderEditableSelect(
                "status",
                entry.status || "Paid",
                "Status",
                ["Paid", "Pending", "Overdue"]
              )}
              {renderEditableDate(
                "paymentDate",
                entry.paymentDate,
                "Payment Date"
              )}
              {renderEditableSelect("mode", entry.mode, "Payment Mode", [
                "Bank Transfer",
                "Cash",
                "Cheque",
              ])}
              {renderEditableField(
                "invoiceNumber",
                entry.invoiceNumber || "",
                "Invoice Number"
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
                      className="h-10"
                      variant="outline"
                      size="sm"
                      onClick={handleEdit}
                    >
                      Edit Entry
                    </Button>
                    <Button
                      className="h-10"
                      variant="outline"
                      size="sm"
                      onClick={handleDeleteInitiate}
                    >
                      Delete
                    </Button>
                    <Button className="h-10" variant="outline" size="sm">
                      View History
                    </Button>
                  </>
                ) : isEditing ? (
                  <>
                    <Button
                      className="h-10 bg-[#2349BA] hover:bg-[#1a3a9b]"
                      variant="default"
                      size="sm"
                      onClick={handleSave}
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                      className="h-10"
                      variant="outline"
                      size="sm"
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
                      Are you sure you want to delete this salary entry? This
                      action cannot be undone.
                    </p>
                    <div className="flex gap-2">
                      <Button
                        className="h-10"
                        variant="destructive"
                        size="sm"
                        onClick={handleDeleteConfirm}
                        disabled={isSaving}
                      >
                        Delete Permanently
                      </Button>
                      <Button
                        className="h-10"
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                        disabled={isSaving}
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
