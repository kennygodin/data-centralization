import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency } from "@/lib/utils";
import {
  SalaryEntry,
  PayableEntry,
  ReceivableEntry,
  PettyCashEntry,
  JournalEntry,
  FinancialStatementEntry,
  InvoiceEntry,
  InternalPaymentEntry,
} from "@/types/accounts.types";
import { ViewSalaryEntry } from "./view-salary";
import { ViewPayableEntry } from "./view-payable";
import { ViewReceivableEntry } from "./view-receivable";
import { ViewPettyCashEntry } from "./view-petty";
import { ViewJournalEntry } from "./view-journal";
import { ViewFinancialStatementEntry } from "./view-financial";
import { ViewInvoiceEntry } from "./view-invoice";
import { ViewInternalPaymentEntry } from "./view-internal";

const createCommonColumns = <T extends object>(): ColumnDef<T>[] => [
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
];

export const salaryColumns: ColumnDef<SalaryEntry>[] = [
  ...createCommonColumns<SalaryEntry>(),
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "salaryAmount",
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
    cell: ({ row }) => formatCurrency(row.getValue("salaryAmount")),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "paymentDate",
    header: "Payment Date",
  },
  {
    accessorKey: "mode",
    header: "Payment Mode",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const entry = row.original;
      return <ViewSalaryEntry entry={entry} onSave={handleSaveSalary} />;
    },
  },
];

async function handleSaveSalary(updatedEntry: SalaryEntry) {
  //TODO Make API call to save changes
}

export const payableColumns: ColumnDef<PayableEntry>[] = [
  ...createCommonColumns<PayableEntry>(),
  {
    accessorKey: "invoiceNumber",
    header: "Invoice #",
  },
  {
    accessorKey: "supplierName",
    header: "Supplier",
  },
  {
    accessorKey: "amountPayable",
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
    cell: ({ row }) => formatCurrency(row.getValue("amountPayable")),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const entry = row.original;
      return <ViewPayableEntry entry={entry} onSave={handleSavePayable} />;
    },
  },
];
async function handleSavePayable(updatedEntry: PayableEntry) {
  // TODO: Make API call to save changes
}

export const receivableColumns: ColumnDef<ReceivableEntry>[] = [
  ...createCommonColumns<ReceivableEntry>(),
  {
    accessorKey: "invoiceNumber",
    header: "Invoice #",
  },
  {
    accessorKey: "clientName",
    header: "Client",
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
    cell: ({ row }) => formatCurrency(row.getValue("amount")),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const entry = row.original;
      return (
        <ViewReceivableEntry entry={entry} onSave={handleSaveReceivable} />
      );
    },
  },
];

async function handleSaveReceivable(updatedEntry: ReceivableEntry) {
  //TODO: Make API call to save changes
}

export const pettyCashColumns: ColumnDef<PettyCashEntry>[] = [
  ...createCommonColumns<PettyCashEntry>(),
  {
    accessorKey: "description",
    header: "Description",
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
    cell: ({ row }) => formatCurrency(row.getValue("amount")),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "paidBy",
    header: "Paid By",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "approvedBy",
    header: "Approved By",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const entry = row.original;
      return <ViewPettyCashEntry entry={entry} />;
    },
  },
];

export const journalColumns: ColumnDef<JournalEntry>[] = [
  ...createCommonColumns<JournalEntry>(),
  {
    accessorKey: "entryType",
    header: "Type",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "accountName",
    header: "Account",
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
    cell: ({ row }) => formatCurrency(row.getValue("amount")),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "approvedBy",
    header: "Approved By",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const entry = row.original;
      return <ViewJournalEntry entry={entry} />;
    },
  },
];

export const financialStatementColumns: ColumnDef<FinancialStatementEntry>[] = [
  {
    accessorKey: "reportType",
    header: "Report Type",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
  {
    accessorKey: "totalRevenue",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xs"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total Revenue
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => formatCurrency(row.getValue("totalRevenue")),
  },
  {
    accessorKey: "totalExpenses",
    header: "Total Expenses",
    cell: ({ row }) => formatCurrency(row.getValue("totalExpenses")),
  },
  {
    accessorKey: "netProfitLoss",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xs"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Net Profit/Loss
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => formatCurrency(row.getValue("netProfitLoss")),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const entry = row.original;
      return <ViewFinancialStatementEntry entry={entry} />;
    },
  },
];

export const invoiceColumns: ColumnDef<InvoiceEntry>[] = [
  ...createCommonColumns<InvoiceEntry>(),
  {
    accessorKey: "invoiceNumber",
    header: "Invoice #",
  },
  {
    accessorKey: "clientVendorName",
    header: "Client/Vendor",
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xs"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total Amount
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => formatCurrency(row.getValue("totalAmount")),
  },
  {
    accessorKey: "taxAmount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xs"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tax
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => formatCurrency(row.getValue("taxAmount") || 0),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
  },
  {
    accessorKey: "paymentTerms",
    header: "Payment Terms",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const entry = row.original;
      return <ViewInvoiceEntry entry={entry} />;
    },
  },
];

export const internalPaymentColumns: ColumnDef<InternalPaymentEntry>[] = [
  ...createCommonColumns<InternalPaymentEntry>(),
  {
    accessorKey: "recipient",
    header: "Recipient",
  },
  {
    accessorKey: "paymentType",
    header: "Payment Type",
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
    cell: ({ row }) => formatCurrency(row.getValue("amount")),
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "approvedBy",
    header: "Approved By",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const entry = row.original;
      return <ViewInternalPaymentEntry entry={entry} />;
    },
  },
];
