import { useEffect, useState } from "react";
import { columns, Entries } from "./income-column";
import { IncomeDataTable } from "./income-table";

export const Income = () => {
  const [data, setData] = useState<Entries[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res: Entries[] = [
        {
          id: "728ed52f",
          weekEnding: "2025-05-03",
          enteredBy: "John Doe",
          amount: 100,
          enteredOn: "2025-05-04",
          enteredDate: "2025-05-04",
          lastEditedBy: "Jboi Adejat",
          lastEditedOn: "2025-05-05",
        },
        {
          id: "728ed512f",
          weekEnding: "2025-04-26",
          enteredBy: "Jane Smith",
          enteredDate: "2025-05-04",
          lastEditedBy: "Fikayo, Ademola",
          amount: 200,
          enteredOn: "2025-04-27",
          lastEditedOn: "2025-04-28",
        },
        {
          id: "728ed5221f",
          weekEnding: "2025-04-19",
          enteredBy: "Alice Johnson",
          amount: 300,
          enteredOn: "2025-04-20",
          enteredDate: "2025-05-12",
          lastEditedBy: "Prisca Lookman",
          lastEditedOn: "2025-04-21",
        },
        {
          id: "728ed5221f",
          weekEnding: "2025-04-19",
          enteredBy: "Alice Johnson",
          amount: 300,
          enteredOn: "2025-04-20",
          enteredDate: "2025-05-12",
          lastEditedBy: "Prisca Lookman",
          lastEditedOn: "2025-04-21",
        },
        {
          id: "728ed5221f",
          weekEnding: "2025-04-19",
          enteredBy: "Alice Johnson",
          amount: 300,
          enteredOn: "2025-04-20",
          enteredDate: "2025-05-12",
          lastEditedBy: "Prisca Lookman",
          lastEditedOn: "2025-04-21",
        },
      ];
      setData(res);
    }

    fetchData();
  }, []);

  return (
    <div className="col-span-2">
      <div className="rounded-xl border p-4 shadow-sm">
        <h3 className="text-lg text-slate-950 mb-4 font-medium">
          Recent Income
        </h3>
        <IncomeDataTable columns={columns} data={data} />
      </div>
    </div>
  );
};
