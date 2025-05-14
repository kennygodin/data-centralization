import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ColumnDef } from "@tanstack/react-table";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: string | number, compact = false) => {
  const numValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(numValue)) {
    return "₦0";
  }

  if (!compact) {
    return `₦${numValue.toLocaleString("en-US")}`;
  }

  if (numValue >= 1000000) {
    return `₦${(numValue / 1000000).toFixed(1)}M`;
  }
  if (numValue >= 1000) {
    return `₦${(numValue / 1000).toFixed(1)}K`;
  }
  return `₦${numValue}`;
};

export function getColumnAccessors<T>(columns: ColumnDef<T>[]) {
  return columns
    .filter((col) => !col.id?.includes("actions") && col.id !== "select")
    .map((col) => {
      const accessorKey =
        (col as { accessorKey?: string }).accessorKey ||
        (col as { id?: string }).id ||
        "";

      const header =
        typeof col.header === "function"
          ? "Column"
          : (col.header as string) || col.id || "";

      return {
        accessorKey,
        header,
      };
    })
    .filter((col) => col.accessorKey && col.header) as {
    accessorKey: string;
    header: string;
  }[];
}
