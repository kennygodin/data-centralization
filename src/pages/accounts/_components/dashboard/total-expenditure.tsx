import { useEffect, useState } from "react";
import { columns, Entries } from "./column";
import { TotalExpenditureTable } from "./table";

export const TotalExpenditure = () => {
  const [data, setData] = useState<Entries[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res: Entries[] = [
        {
          id: "728ed52f",
          category: "Sales Payment",
          totalAmount: 560000000,
          noOfTransactions: 11,
          lastUpdated: "2025-05-04",
        },
        {
          id: "8ie343nas",
          category: "Payables",
          totalAmount: 110020100,
          noOfTransactions: 30,
          lastUpdated: "2025-05-04",
        },
        {
          id: "728ed52f",
          category: "Receivables",
          totalAmount: 210000000,
          noOfTransactions: 20,
          lastUpdated: "2025-05-04",
        },
        {
          id: "9ios3dd3",
          category: "Petty Cash",
          totalAmount: 100000000,
          noOfTransactions: 12,
          lastUpdated: "2025-05-04",
        },
        {
          id: "3sdd9dfnn",
          category: "Journals",
          totalAmount: 300000000,
          noOfTransactions: 5,
          lastUpdated: "2025-05-04",
        },
        {
          id: "ya79dsdn2",
          category: "Financial Statements",
          totalAmount: 100000,
          noOfTransactions: 4,
          lastUpdated: "2025-05-04",
        },
        {
          id: "728ed52f",
          category: "Invoices(Issued)",
          totalAmount: 210000000,
          noOfTransactions: 8,
          lastUpdated: "2025-05-04",
        },
        {
          id: "68dhabb3",
          category: "Internal Payments",
          totalAmount: 120000000,
          noOfTransactions: 12,
          lastUpdated: "2025-05-04",
        },
      ];
      setData(res);
    }

    fetchData();
  }, []);

  return (
    <div className="col-span-2 h-full">
      <div className="rounded-xl border p-4 shadow-sm h-full flex flex-col">
        <h3 className="text-lg text-slate-950 mb-4 font-medium">
          Total Expenditure this Month
        </h3>
        <div className="flex-1 overflow-hidden">
          <TotalExpenditureTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
};
