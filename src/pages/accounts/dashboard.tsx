import { DollarSign, Euro, TicketCheck, Timer } from "lucide-react";
import { CardData, DashboardCard } from "./_components/dashboard/view-card";
import { Badge } from "@/components/ui/badge";
import { RevenueChart } from "./_components/dashboard/revenue-chart";
import { TotalExpenditure } from "./_components/dashboard/total-expenditure";

export const AccountsDashboard = () => {
  const getDashboardData = (): CardData[] => {
    return [
      {
        id: 1,
        title: "Total expenditure",
        icon: DollarSign,
        currentMonthValue: 12_450_000,
        lastMonthValue: 10_300_000,
        isCurrency: true,
      },
      {
        id: 2,
        title: "Pending payable",
        icon: Timer,
        currentMonthValue: 3_200_000,
        lastMonthValue: 4_000_000,
        isCurrency: true,
      },
      {
        id: 3,
        title: "Total invoices issued",
        icon: TicketCheck,
        currentMonthValue: 9876,
      },
      {
        id: 4,
        title: "Total salaries paid",
        icon: Euro,
        currentMonthValue: 8_750_000,
        lastMonthValue: 8_750_000,
        isCurrency: true,
      },
    ];
  };

  const cardData = getDashboardData();

  return (
    <div>
      <div className="p-4 space-y-4">
        <div className="flex flex-col w-max">
          <h1 className="text-2xl text-slate-950 mb-4">Overview</h1>
          <Badge variant="outline" className="py-2 px-6 text-base font-light">
            This Month
          </Badge>
        </div>
        <DashboardCard data={cardData} />
        <div className="grid grid-cols-3 gap-4">
          <TotalExpenditure />
          <RevenueChart />
        </div>
      </div>
    </div>
  );
};
