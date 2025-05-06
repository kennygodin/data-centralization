import { ColumnDef } from "@tanstack/react-table";
import { ClientEntry, IncomeEntry, ProspectEntry } from "../../types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { ViewEntry } from "./view-entry";
import { formatCurrency } from "@/lib/utils";

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
  {
    accessorKey: "id",
    header: "Entry ID",
  },
  {
    accessorKey: "weekEnding",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xs"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Week Ending
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
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
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      return <span>{formatCurrency(amount)}</span>;
    },
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
    accessorKey: "totalClients",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xs"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total Clients
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  { accessorKey: "lastEditedOn", header: "Last Edited On" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const entry = row.original;
      return <ViewEntry entry={entry} />;
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
  {
    accessorKey: "totalProspects",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xs"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total Prospects
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  { accessorKey: "lastEditedOn", header: "Last Edited On" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const entry = row.original;
      return <ViewEntry entry={entry} />;
    },
  },
];
