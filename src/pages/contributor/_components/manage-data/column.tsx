import { ColumnDef } from "@tanstack/react-table";
import { ClientEntry, IncomeEntry, ProspectEntry } from "../../types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export const incomeColumns: ColumnDef<IncomeEntry>[] = [
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
  { accessorKey: "id", header: "Entry ID" },
  { accessorKey: "weekEnding", header: "Week Ending" },
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
    accessorKey: "enteredDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xs"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Entered Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xs"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  { accessorKey: "lastEditedOn", header: "Last Modified On" },
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

export const clientColumns: ColumnDef<ClientEntry>[] = [
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
  { accessorKey: "id", header: "Entry ID" },
  { accessorKey: "weekEnding", header: "Week Ending" },
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
    accessorKey: "enteredDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xs"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Entered Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "clientName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xs"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Client Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  { accessorKey: "totalClients", header: "Total Clients" },
  { accessorKey: "lastEditedOn", header: "Last Modified On" },
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

export const prospectColumns: ColumnDef<ProspectEntry>[] = [
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
  { accessorKey: "id", header: "Entry ID" },
  { accessorKey: "weekEnding", header: "Week Ending" },
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
    accessorKey: "enteredDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xs"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Entered Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  { accessorKey: "prospectName", header: "Prospect Name" },
  { accessorKey: "totalProspects", header: "Total Prospects" },
  { accessorKey: "lastEditedOn", header: "Last Modified On" },
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
