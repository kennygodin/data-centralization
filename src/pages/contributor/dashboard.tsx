import { CardData, DashboardCard } from "./_components/view-card";
import { SelectDate } from "./_components/dashboard/select-date";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  CalendarDays,
  CircleCheck,
  DollarSign,
  UserRoundPlus,
} from "lucide-react";
import { Income } from "./_components/dashboard/income";
import { IncomeChart } from "./_components/dashboard/income-chart";

export const ContributorDashboard = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  // Mocked data
  const getDashboardData = (range: DateRange | undefined) => {
    return [
      {
        id: 1,
        title: "Total income",
        icon: DollarSign,
        currentWeekValue: 12000000,
        lastWeekValue: 10000000,
        isCurrency: true,
      },
      {
        id: 2,
        title: "New client acquired",
        icon: UserRoundPlus,
        currentWeekValue: 27,
        lastWeekValue: 24,
      },
      {
        id: 3,
        title: "Leads in pipeline",
        icon: CircleCheck,
        currentWeekValue: 12,
        lastWeekValue: 24,
      },
      {
        id: 4,
        title: "Last entry date",
        icon: CalendarDays,
        currentWeekValue: format(new Date(), "MMM d"),
        isDate: true,
      },
    ] as CardData[];
  };

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range);
    // TODO: API call based on date range passed
  };

  const cardData = getDashboardData(dateRange);

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col w-max">
        <h1 className="text-2xl text-slate-950 mb-4">Dashboard</h1>
        <SelectDate onDateChange={handleDateChange} />
      </div>
      <DashboardCard data={cardData} />
      <div className="grid grid-cols-3 space-x-3">
        <Income />
        <IncomeChart />
      </div>
    </div>
  );
};
