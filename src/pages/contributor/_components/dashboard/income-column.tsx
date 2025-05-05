import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export type Entries = {
  id: string;
  weekEnding: string;
  enteredBy: string;
  amount: number;
  enteredOn: string;
  lastEditedOn: string;
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
      return <span>${amount.toFixed(2)}</span>;
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
      const actions = row.original;
      return (
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => console.log("Edit", actions.id)}
        >
          View
        </Button>
      );
    },
  },
];
