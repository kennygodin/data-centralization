import { DataTable } from "./data-table";
import { BaseEntry } from "@/types/accounts.types";
import {
  financialStatementColumns,
  internalPaymentColumns,
  invoiceColumns,
  journalColumns,
  payableColumns,
  pettyCashColumns,
  receivableColumns,
  salaryColumns,
} from "./columns";
import { endOfMonth, isWithinInterval, startOfMonth } from "date-fns";
import {
  financialStatementData,
  internalPaymentData,
  invoiceData,
  journalData,
  payableData,
  pettyCashData,
  receivableData,
  salaryData,
} from "./dummy-data";

interface ManageRecordsTableProps {
  activeTab: string;
  searchValue: string;
  filter: {
    type: string;
    dateRange?: { from: Date; to: Date };
  };
  onSelectionChange?: (count: number, rows: Record<string, boolean>) => void;
}

export const ManageRecordsTable = ({
  activeTab,
  searchValue,
  filter,
  onSelectionChange,
}: ManageRecordsTableProps) => {
  const filterData = <T extends BaseEntry>(data: T[]): T[] => {
    let filteredData = data;

    if (searchValue) {
      filteredData = filteredData.filter((item) =>
        Object.values(item).some(
          (val) =>
            val &&
            val.toString().toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }

    if (filter.type === "this-month" || filter.type === "date-range") {
      filteredData = filteredData.filter((item) => {
        if (!item.enteredDate) return false;

        try {
          const enteredDate = new Date(item.enteredDate);

          if (filter.type === "this-month") {
            const today = new Date();
            const monthStart = startOfMonth(today);
            const monthEnd = endOfMonth(today);
            return isWithinInterval(enteredDate, {
              start: monthStart,
              end: monthEnd,
            });
          }

          if (filter.type === "date-range" && filter.dateRange) {
            return isWithinInterval(enteredDate, {
              start: filter.dateRange.from,
              end: filter.dateRange.to,
            });
          }
        } catch (e) {
          console.error("Invalid date format:", item.enteredDate, e);
          return false;
        }

        return true;
      });
    }

    return filteredData;
  };

  const renderDataTable = () => {
    switch (activeTab) {
      case "salary-payments":
        return (
          <DataTable
            columns={salaryColumns}
            data={filterData(salaryData)}
            searchValue={searchValue}
            onSelectionChange={onSelectionChange}
          />
        );
      case "payables":
        return (
          <DataTable
            columns={payableColumns}
            data={filterData(payableData)}
            searchValue={searchValue}
            onSelectionChange={onSelectionChange}
          />
        );
      case "receivables":
        return (
          <DataTable
            columns={receivableColumns}
            data={filterData(receivableData)}
            searchValue={searchValue}
            onSelectionChange={onSelectionChange}
          />
        );
      case "petty-cash":
        return (
          <DataTable
            columns={pettyCashColumns}
            data={filterData(pettyCashData)}
            searchValue={searchValue}
            onSelectionChange={onSelectionChange}
          />
        );
      case "journals":
        return (
          <DataTable
            columns={journalColumns}
            data={filterData(journalData)}
            searchValue={searchValue}
            onSelectionChange={onSelectionChange}
          />
        );
      case "financial-statement":
        return (
          <DataTable
            columns={financialStatementColumns}
            data={filterData(financialStatementData)}
            searchValue={searchValue}
            onSelectionChange={onSelectionChange}
          />
        );
      case "invoices":
        return (
          <DataTable
            columns={invoiceColumns}
            data={filterData(invoiceData)}
            searchValue={searchValue}
            onSelectionChange={onSelectionChange}
          />
        );
      case "internal-payments":
        return (
          <DataTable
            columns={internalPaymentColumns}
            data={filterData(internalPaymentData)}
            searchValue={searchValue}
            onSelectionChange={onSelectionChange}
          />
        );
      default:
        return null;
    }
  };

  return renderDataTable();
};
