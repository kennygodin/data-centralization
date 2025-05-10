import { endOfMonth, isWithinInterval, startOfMonth } from "date-fns";
import { ClientEntry, IncomeEntry, ProspectEntry } from "../../types";
import { clientColumns, incomeColumns, prospectColumns } from "./column";
import { DataTable } from "./data-table";

interface ManageRecordsTableProps {
  activeTab: string;
  searchValue: string;
  filter: {
    type: string;
    dateRange?: { from: Date; to: Date };
  };
}

export const ManageRecordsTable = ({
  activeTab,
  searchValue,
  filter,
}: ManageRecordsTableProps) => {
  const incomeData: IncomeEntry[] = [
    {
      id: "1",
      weekEnding: "2025-05-03",
      enteredBy: "Kenechukwu Okoh",
      enteredDate: "2025-04-20",
      lastEditedOn: "2025-05-05",
      lastEditedBy: "Admin",
      amount: 240900,
      note: "Income note",
    },
    {
      id: "2",
      weekEnding: "2025-05-03",
      enteredBy: "Adbul Kamaru",
      enteredDate: "2025-04-24",
      lastEditedOn: "2025-05-05",
      lastEditedBy: "Admin",
      amount: 30000,
      note: "Income note",
    },
    {
      id: "3",
      weekEnding: "2025-05-03",
      enteredBy: "Daniel Joel",
      enteredDate: "2025-05-03",
      lastEditedOn: "2025-05-05",
      lastEditedBy: "Admin",
      amount: 550000,
      note: "Income note",
    },
    {
      id: "4",
      weekEnding: "2025-05-03",
      enteredBy: "John Doeh",
      enteredDate: "2025-05-04",
      lastEditedOn: "2025-05-05",
      lastEditedBy: "Admin",
      amount: 1102000,
      note: "Income note",
    },
    {
      id: "5",
      weekEnding: "2025-05-03",
      enteredBy: "Chinedu Obieze",
      enteredDate: "2025-04-10",
      lastEditedOn: "2025-05-05",
      lastEditedBy: "Admin",
      amount: 240900,
      note: "Income note",
    },
    {
      id: "6",
      weekEnding: "2025-05-03",
      enteredBy: "Adbul Kamaru",
      enteredDate: "2025-04-25",
      lastEditedOn: "2025-05-05",
      lastEditedBy: "Admin",
      amount: 30000,
      note: "Income note",
    },
    {
      id: "7",
      weekEnding: "2025-05-03",
      enteredBy: "Daniel Joel",
      enteredDate: "2025-05-04",
      lastEditedOn: "2025-05-05",
      lastEditedBy: "Admin",
      amount: 550000,
      note: "Income note",
    },
    {
      id: "8",
      weekEnding: "2025-05-03",
      enteredBy: "John Doeh",
      enteredDate: "2025-05-05",
      lastEditedOn: "2025-05-05",
      lastEditedBy: "Admin",
      amount: 1102000,
      note: "Income note",
    },
    {
      id: "9",
      weekEnding: "2025-05-03",
      enteredBy: "Kenechukwu Micheal",
      enteredDate: "2025-04-23",
      lastEditedOn: "2025-05-05",
      lastEditedBy: "Admin",
      amount: 240900,
      note: "Income note",
    },
    {
      id: "10",
      weekEnding: "2025-05-03",
      enteredBy: "Adbul Waziri",
      enteredDate: "2025-04-26",
      lastEditedOn: "2025-05-05",
      lastEditedBy: "Admin",
      amount: 30000,
      note: "Income note",
    },
    {
      id: "11",
      weekEnding: "2025-05-03",
      enteredBy: "Daniel Joel",
      enteredDate: "2025-05-03",
      lastEditedOn: "2025-05-05",
      lastEditedBy: "Admin",
      amount: 550000,
      note: "Income note",
    },
    {
      id: "12",
      weekEnding: "2025-05-03",
      enteredBy: "Jane Doeh",
      enteredDate: "2025-05-06",
      lastEditedOn: "2025-05-06",
      lastEditedBy: "Admin",
      amount: 1102000,
      note: "Income note",
    },
  ];

  const clientData: ClientEntry[] = [
    {
      id: "1",
      weekEnding: "2025-05-01",
      enteredBy: "Admin",
      enteredDate: "2025-02-10",
      lastEditedOn: "2025-05-03",
      lastEditedBy: "Peter Drury",
      // lastEditedOn: "2025-05-03",
      totalClients: 5,
      note: "Client note",
    },
    {
      id: "2",
      weekEnding: "2025-05-01",
      enteredBy: "Alice Doweh",
      enteredDate: "2025-03-20",
      lastEditedOn: "2025-05-03",
      lastEditedBy: "Peter Drury",
      // lastEditedOn: "2025-05-03",
      totalClients: 5,
      note: "Client note",
    },
    {
      id: "3",
      weekEnding: "2025-05-01",
      enteredBy: "Chizy Best",
      enteredDate: "2025-04-01",
      lastEditedOn: "2025-05-03",
      lastEditedBy: "Peter Drury",
      // lastEditedOn: "2025-05-03",
      totalClients: 5,
      note: "Client note",
    },
    {
      id: "4",
      weekEnding: "2025-05-01",
      enteredBy: "Williams Usman",
      enteredDate: "2025-05-01",
      lastEditedOn: "2025-05-03",
      lastEditedBy: "Peter Drury",
      // lastEditedOn: "2025-05-03",
      totalClients: 5,
      note: "Client note",
    },
  ];

  const prospectData: ProspectEntry[] = [
    {
      id: "1",
      weekEnding: "2025-04-30",
      enteredBy: "Abigail Murphy",
      enteredDate: "2025-04-11",
      lastEditedOn: "2025-05-02",
      lastEditedBy: "Admin",
      // lastEditedOn: "2025-05-02",
      totalProspects: 5,
      note: "Prospect note",
    },
    {
      id: "2",
      weekEnding: "2025-04-30",
      enteredBy: "Luigi Toad",
      enteredDate: "2025-05-01",
      lastEditedOn: "2025-05-02",
      lastEditedBy: "Admin",
      // lastEditedOn: "2025-05-02",
      totalProspects: 19,
      note: "Prospect note",
    },
    {
      id: "3",
      weekEnding: "2025-04-30",
      enteredBy: "Appiah Zubby",
      enteredDate: "2025-05-21",
      lastEditedOn: "2025-05-02",
      lastEditedBy: "Admin",
      // lastEditedOn: "2025-05-02",
      totalProspects: 20,
      note: "Prospect note",
    },
  ];

  const filterData = <T extends IncomeEntry | ClientEntry | ProspectEntry>(
    data: T[]
  ): T[] => {
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

    if (filter.type === "this-month") {
      const today = new Date();
      const monthStart = startOfMonth(today);
      const monthEnd = endOfMonth(today);
      filteredData = filteredData.filter((item) => {
        const enteredDate = new Date(item.enteredDate);
        return isWithinInterval(enteredDate, {
          start: monthStart,
          end: monthEnd,
        });
      });
    } else if (filter.type === "date-range" && filter.dateRange) {
      filteredData = filteredData.filter((item) => {
        const enteredDate = new Date(item.enteredDate);
        return isWithinInterval(enteredDate, {
          start: filter.dateRange!.from,
          end: filter.dateRange!.to,
        });
      });
    }

    return filteredData;
  };

  switch (activeTab) {
    case "income":
      return (
        <DataTable
          columns={incomeColumns}
          data={filterData(incomeData)}
          searchValue={searchValue}
        />
      );
    case "client":
      return (
        <DataTable
          columns={clientColumns}
          data={filterData(clientData)}
          searchValue={searchValue}
        />
      );
    case "prospect":
      return (
        <DataTable
          columns={prospectColumns}
          data={filterData(prospectData)}
          searchValue={searchValue}
        />
      );
    default:
      return null;
  }
};
