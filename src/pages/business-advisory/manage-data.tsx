import { Receipt, UserRoundPlus, CircleFadingPlus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SortRecords } from "./_components/manage-data/sort-records";
import { TabButtons } from "./_components/manage-data/tab-buttons";
import { ManageRecordsTable } from "./_components/manage-data/manage-record-table";
import { useEffect, useState } from "react";
import { AddDataModal } from "./_components/manage-data/add-data";
import { useLocation, useSearchParams } from "react-router-dom";

export const BusinessAdvisoryManageData = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "income"
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

  return (
    <div className="p-4">
      <div className="flex flex-col w-max">
        <h1 className="text-2xl text-slate-950 mb-4">Manage Data</h1>
        <div className="flex items-center space-x-2 mb-4">
          <AddDataModal
            type="income"
            icon={<Receipt size={15} />}
            iconBg="bg-[#2CAA5D]"
            label="Add revenue"
          />
          <AddDataModal
            type="client"
            icon={<UserRoundPlus size={15} />}
            iconBg="bg-[#2C3DAA]"
            label="Add client"
          />
          <AddDataModal
            type="prospect"
            icon={<CircleFadingPlus size={15} />}
            iconBg="bg-[#2CA6AA]"
            label="Add prospect"
          />
        </div>
      </div>
      <h1 className="text-2xl text-slate-950 mb-4">Records</h1>
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <div className="flex-1">
          <SortRecords onFilterChange={handleFilterChange} />
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
          activeTab={activeTab}
          searchValue={searchValue}
          filter={activeFilter}
        />
      </div>
    </div>
  );
};
