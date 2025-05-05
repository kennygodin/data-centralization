import { useEffect, useState } from "react";
import { columns, Entries } from "./recent-entries-column";
import { DataTable } from "./recent-entries-data-table";

export const RecentEntries = () => {
  const [data, setData] = useState<Entries[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res: Entries[] = [
        {
          id: "728ed52f",
          weekEnding: "2025-05-03",
          submittedBy: "John Doe",
          amount: 100,
          submittedOn: "2025-05-04",
          lastEditedOn: "2025-05-05",
        },
        {
          id: "728ed512f",
          weekEnding: "2025-04-26",
          submittedBy: "Jane Smith",
          amount: 200,
          submittedOn: "2025-04-27",
          lastEditedOn: "2025-04-28",
        },
        {
          id: "728ed5221f",
          weekEnding: "2025-04-19",
          submittedBy: "Alice Johnson",
          amount: 300,
          submittedOn: "2025-04-20",
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
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};
