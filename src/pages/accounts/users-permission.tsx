import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { TableActions } from "./_components/users-permission/table-actions";
import { DataTable } from "./_components/users-permission/data-table";
import { usersColumns } from "./_components/users-permission/columns";
import { mockUsers } from "./_components/users-permission/dummy-data";
import { useState } from "react";

export const AccountsUsersPermission = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="p-4 w-full">
      <div className="flex flex-col w-full">
        <h1 className="text-2xl text-slate-950 mb-4">Users Permission</h1>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <div className="flex-1">
            <TableActions />
          </div>
          <div className="relative w-full md:w-auto md:min-w-[400px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              className="pl-10 h-12"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search records"
            />
          </div>
        </div>
        <div className="mt-6">
          <DataTable
            columns={usersColumns}
            data={mockUsers}
            searchValue={searchValue}
          />
        </div>
      </div>
    </div>
  );
};
