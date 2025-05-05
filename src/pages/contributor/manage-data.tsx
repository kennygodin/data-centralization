import { Receipt, UserRoundPlus, CircleFadingPlus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ManageDataAddButton } from "./_components/manage-data/manage-data-add-btn";
import { SortRecords } from "./_components/manage-data/sort-records";
import { TabButtons } from "./_components/manage-data/tab-buttons";
import { ManageRecordsTable } from "./_components/manage-data/manage-record-table";
import { useState } from "react";

const manageActions = [
  {
    label: "Add new income",
    icon: <Receipt size={15} color="#fff" />,
    iconBg: "bg-[#2CAA5D]",
  },
  {
    label: "Add new client",
    icon: <UserRoundPlus size={15} color="#fff" />,
    iconBg: "bg-[#2C3DAA]",
  },
  {
    label: "Add new prospect",
    icon: <CircleFadingPlus size={15} color="#fff" />,
    iconBg: "bg-[#2CA6AA]",
  },
];

export const ContributorManageData = () => {
  const [activeTab, setActiveTab] = useState("income");
  const [searchValue, setSearchValue] = useState("");

  const handleTabChange = (value: string) => {
    console.log("Active tab:", value);
    setSearchValue("");
    setActiveTab(value);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col w-max">
        <h1 className="text-2xl text-slate-950 mb-4">Manage Data</h1>
        <div className="flex items-center space-x-2 mb-4">
          {manageActions.map((action, index) => (
            <ManageDataAddButton
              key={index}
              label={action.label}
              icon={action.icon}
              iconBg={action.iconBg}
            />
          ))}
        </div>
      </div>
      <h1 className="text-2xl text-slate-950 mb-4">Records</h1>
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <div className="flex-1">
          <SortRecords />
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
        <TabButtons onTabChange={handleTabChange} />
      </div>

      <div className="mt-6">
        <ManageRecordsTable activeTab={activeTab} searchValue={searchValue} />
      </div>
    </div>
  );
};
