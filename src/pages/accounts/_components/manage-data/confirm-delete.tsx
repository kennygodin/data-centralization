import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmationDialogProps<TData> {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  selectedItems: TData[];
  columns: {
    accessorKey: string;
    header: string;
  }[];
}

export function ConfirmDelete<TData>({
  isOpen,
  onOpenChange,
  onConfirm,
  selectedItems,
  columns,
}: DeleteConfirmationDialogProps<TData>) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <DialogTitle>Confirm Deletion</DialogTitle>
          </div>
          <DialogDescription>
            You are about to delete {selectedItems.length} item(s). This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[300px] overflow-y-auto border rounded-md p-4">
          {selectedItems.length === 0 ? (
            <p className="text-muted-foreground text-sm">No items selected</p>
          ) : (
            <div className="space-y-4">
              {selectedItems.map((item, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <h4 className="font-medium mb-2">Item {index + 1}</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {columns.map((column) => (
                      <div key={column.accessorKey} className="space-y-1">
                        <span className="text-muted-foreground">
                          {column.header}:{" "}
                        </span>
                        <span className="font-medium">
                          {/* @ts-expect-error - dynamically accessing object properties */}
                          {item[column.accessorKey]?.toString() || "-"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete {selectedItems.length} item(s)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
