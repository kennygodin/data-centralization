import {
  BookMarked,
  ChartNoAxesCombined,
  CreditCard,
  Receipt,
  ReceiptText,
  Search,
  Ticket,
  UnfoldVertical,
  Wallet,
} from "lucide-react";
import { AddSalaryModal } from "./_components/manage-data/add-salary";
import { AddPayableModal } from "./_components/manage-data/add-payable";
import { AddReceivableModal } from "./_components/manage-data/add-receivable";
import { AddPettyCashModal } from "./_components/manage-data/add-petty";
import { AddJournalModal } from "./_components/manage-data/add-journal";
import { AddFinancialStatementModal } from "./_components/manage-data/add-financial";
import { AddInvoiceModal } from "./_components/manage-data/add-invoice";
import { AddInternalPaymentModal } from "./_components/manage-data/add-internal";
import { SortRecords } from "./_components/manage-data/sort-records";
import { Input } from "@/components/ui/input";

import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { TabButtons } from "./_components/manage-data/tab-buttons";
import { ManageRecordsTable } from "./_components/manage-data/manage-record-table";
import { ConfirmDelete } from "./_components/manage-data/confirm-delete";
import { getColumnAccessors } from "@/lib/utils";
import {
  financialStatementColumns,
  internalPaymentColumns,
  invoiceColumns,
  journalColumns,
  payableColumns,
  pettyCashColumns,
  receivableColumns,
  salaryColumns,
} from "./_components/manage-data/columns";
import { AllEntryTypes } from "@/types/accounts.types";
import {
  financialStatementData,
  internalPaymentData,
  invoiceData,
  journalData,
  payableData,
  pettyCashData,
  receivableData,
  salaryData,
} from "./_components/manage-data/dummy-data";

export const AccountsManageData = () => {
  const [selectedRowsCount, setSelectedRowsCount] = useState(0);
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [tableData, setTableData] = useState<AllEntryTypes[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "salary-payments"
  );

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );

  const [activeFilter, setActiveFilter] = useState<{
    type: string;
    dateRange?: { from: Date; to: Date };
  }>({ type: "all-records" });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (activeTab) {
      params.set("tab", activeTab);
    } else {
      params.delete("tab");
    }

    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }

    if (params.toString() !== location.search.slice(1)) {
      setSearchParams(params);
    }
  }, [activeTab, searchValue, searchParams, setSearchParams, location.search]);

  useEffect(() => {
    const loadData = () => {
      let data: AllEntryTypes[] = [];
      switch (activeTab) {
        case "salary-payments":
          data = salaryData;
          break;
        case "payables":
          data = payableData;
          break;
        case "receivables":
          data = receivableData;
          break;
        case "petty-cash":
          data = pettyCashData;
          break;
        case "journals":
          data = journalData;
          break;
        case "financial-statement":
          data = financialStatementData;
          break;
        case "invoices":
          data = invoiceData;
          break;
        case "internal-payments":
          data = internalPaymentData;
          break;
        default:
          data = [];
      }
      setTableData(data);
    };

    loadData();
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    setSearchValue("");
    setActiveTab(value);
  };

  const handleFilterChange = (filter: {
    type: string;
    dateRange?: { from: Date; to: Date };
  }) => {
    setActiveFilter(filter);
  };

  const handleSelectionChange = (
    count: number,
    rows: Record<string, boolean>
  ) => {
    setSelectedRowsCount(count);
    setSelectedRows(rows);
  };

  const handleDeleteClick = () => {
    if (Object.keys(selectedRows).length > 0) {
      setIsDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    const selectedItems = tableData.filter(
      (_, index) => selectedRows[index.toString()]
    );

    console.log("Deleting items:", selectedItems);
    // TODO: API call to delete the items
    // await api.deleteItems(selectedItems.map(item => item.id));
    setTableData((prev) =>
      prev.filter((item) => !selectedItems.includes(item))
    );

    setIsDeleteDialogOpen(false);
    setSelectedRows({});
  };

  const getCurrentColumns = () => {
    switch (activeTab) {
      case "salary-payments":
        return getColumnAccessors(salaryColumns);
      case "payables":
        return getColumnAccessors(payableColumns);
      case "receivables":
        return getColumnAccessors(receivableColumns);
      case "petty-cash":
        return getColumnAccessors(pettyCashColumns);
      case "journals":
        return getColumnAccessors(journalColumns);
      case "financial-statement":
        return getColumnAccessors(financialStatementColumns);
      case "invoices":
        return getColumnAccessors(invoiceColumns);
      case "internal-payments":
        return getColumnAccessors(internalPaymentColumns);
      default:
        return [];
    }
  };

  return (
    <div className="p-4 w-full">
      <div className="flex flex-col w-full">
        <h1 className="text-2xl text-slate-950 mb-4">Add Records</h1>
        <div className="flex flex-wrap gap-2 mb-4 w-full">
          <AddSalaryModal
            icon={<Wallet size={15} />}
            iconBg="bg-[#2CAA5D]"
            label="Salary Payment"
          />
          <AddPayableModal
            icon={<UnfoldVertical size={15} />}
            iconBg="bg-[#3B82F6]"
            label="Payable"
          />
          <AddReceivableModal
            icon={<CreditCard size={15} />}
            iconBg="bg-[#F59E0B]"
            label="Receivable"
          />
          <AddPettyCashModal
            icon={<Receipt size={15} />}
            iconBg="bg-[#10B981]"
            label="Petty Cash"
          />
          <AddJournalModal
            icon={<BookMarked size={15} />}
            iconBg="bg-[#8B5CF6]"
            label="Journal Entry"
          />
          <AddFinancialStatementModal
            icon={<ChartNoAxesCombined size={15} />}
            iconBg="bg-[#EF4444]"
            label="Financial Statement"
          />
          <AddInvoiceModal
            icon={<Ticket size={15} />}
            iconBg="bg-[#3F3F46]"
            label="Invoice"
          />
          <AddInternalPaymentModal
            icon={<ReceiptText size={15} />}
            iconBg="bg-[#14B8A6]"
            label="Internal Payment"
          />
        </div>
      </div>
      <h1 className="text-2xl text-slate-950 mb-4">Records</h1>
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <div className="flex-1">
          <SortRecords
            hasSelectedItems={selectedRowsCount > 0}
            onFilterChange={handleFilterChange}
            onDelete={handleDeleteClick}
          />
          <ConfirmDelete
            isOpen={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            onConfirm={handleConfirmDelete}
            selectedItems={tableData.filter(
              (_, index) => selectedRows[index.toString()]
            )}
            columns={getCurrentColumns()}
          />
        </div>
        <div className="relative w-full md:w-auto md:min-w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            className="pl-10 h-10"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search records"
          />
        </div>
      </div>
      <div className="mt-6">
        <TabButtons onTabChange={handleTabChange} activeTab={activeTab} />
      </div>

      <div className="mt-6">
        <ManageRecordsTable
          key={activeTab}
          activeTab={activeTab}
          searchValue={searchValue}
          filter={activeFilter}
          onSelectionChange={handleSelectionChange}
        />
      </div>
    </div>
  );
};
