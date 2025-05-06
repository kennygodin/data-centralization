import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ViewEntry } from "../manage-data/view-entry";
import { formatCurrency } from "@/lib/utils";

export type Entries = {
  id: string;
  weekEnding: string;
  enteredBy: string;
  amount: number;
  enteredOn: string;
  lastEditedOn: string;
  enteredDate: string;
  lastEditedBy: string;
  note?: string;
};

export const columns: ColumnDef<Entries>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Entry ID",
  },
  {
    accessorKey: "weekEnding",
    header: "Week Ending",
  },
  {
    accessorKey: "enteredBy",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xs"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Entered By
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      return <span>{formatCurrency(amount)}</span>;
    },
  },
  {
    accessorKey: "enteredOn",
    header: "Entered On",
  },
  {
    accessorKey: "lastEditedOn",
    header: "Last Edited On",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const entry = row.original;
      return <ViewEntry entry={entry} />;
    },
  },
];
