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
import {
  ClientEntry,
  IncomeEntry,
  ProspectEntry,
} from "@/types/business-advisory.types";

interface IncomeEntrySheetProps {
  entry: IncomeEntry | ClientEntry | ProspectEntry;
}

export function ViewEntry({ entry: initialEntry }: IncomeEntrySheetProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [entry, setEntry] = useState(initialEntry);
  const [isSaving, setIsSaving] = useState(false);

  const getEntryType = () => {
    if ("amount" in entry) return "income";
    if ("totalClients" in entry) return "client";
    if ("totalProspects" in entry) return "prospect";
    return "unknown";
  };

  const entryType = getEntryType();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: make an API call to save the changes
      // For now, we'll just simulate it
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedEntry = {
        ...entry,
        lastEditedOn: new Date().toISOString().split("T")[0],
        lastModifiedBy: "Current User", // You'll add this later
      };

      setEntry(updatedEntry);
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
  };

  const handleChange = (field: string, value: string | number) => {
    setEntry((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderEditableField = (
    field: string,
    value: string | number,
    isCurrency = false
  ) => {
    if (!isEditing) {
      return (
        <span className="text-slate-950">
          {isCurrency ? `₦${Number(value).toLocaleString()}` : value}
        </span>
      );
    }

    return (
      <Input
        type={typeof value === "number" ? "number" : "text"}
        value={value}
        onChange={(e) =>
          handleChange(
            field,
            typeof value === "number" ? Number(e.target.value) : e.target.value
          )
        }
        className="h-8 w-32"
      />
    );
  };

  const renderEditableNote = () => {
    if (!isEditing) {
      return (
        <p className="text-xs mt-1 p-2 bg-gray-100 text-slate-950 rounded">
          {entry.note || "No note provided"}
        </p>
      );
    }

    return (
      <textarea
        value={entry.note}
        onChange={(e) => handleChange("note", e.target.value)}
        className="w-full p-2 border rounded text-sm min-h-[80px]"
      />
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          Open
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[500px]">
        <SheetHeader className="p-6">
          <SheetTitle className="text-2xl">
            {entryType === "income"
              ? "Income"
              : entryType === "client"
                ? "Client"
                : "Prospect"}{" "}
            Entry #{entry.id}
          </SheetTitle>
          <SheetDescription className="mt-6">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Week Ending:</span>
                <span className="text-slate-950">{entry.weekEnding}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Entered By:</span>
                <span className="text-slate-950">{entry.enteredBy}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Entered Date:</span>
                <span className="text-slate-950">{entry.enteredDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Last Edited On:</span>
                <span className="text-slate-950">{entry.lastEditedOn}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Last Edited By:</span>
                <span className="text-slate-950">{entry.lastEditedBy}</span>
              </div>

              {entryType === "income" && (
                <div className="flex items-center justify-between">
                  <span className="font-medium">Amount:</span>
                  {renderEditableField(
                    "amount",
                    (entry as IncomeEntry).amount,
                    true
                  )}
                </div>
              )}
              {entryType === "client" && (
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total Clients:</span>
                  {renderEditableField(
                    "totalClients",
                    (entry as ClientEntry).totalClients
                  )}
                </div>
              )}
              {entryType === "prospect" && (
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total Prospects:</span>
                  {renderEditableField(
                    "totalProspects",
                    (entry as ProspectEntry).totalProspects
                  )}
                </div>
              )}

              <div className="mt-2">
                <span className="font-medium">Note:</span>
                {renderEditableNote()}
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div className="border-t pt-2">
            <div className="p-6">
              <h3 className="font-medium">Actions</h3>
              <p className="text-xs text-muted-foreground mt-2">
                {entryType === "income" &&
                  "Income details and related transactions"}
                {entryType === "client" &&
                  "Client acquisition details and metrics"}
                {entryType === "prospect" &&
                  "Prospect conversion pipeline information"}
              </p>
              <div className="flex gap-2 pt-2">
                {!isEditing ? (
                  <>
                    <Button variant="outline" size="sm" onClick={handleEdit}>
                      Edit Entry
                    </Button>
                    <Button variant="outline" size="sm">
                      View Logs
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleSave}
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancel}
                      disabled={isSaving}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
