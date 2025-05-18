import { AccountsOverviewChart } from "./_components/analytics/account-overview-chart";

export const AccountsAnalytics = () => {
  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl text-slate-950 mb-4">Analytics</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <AccountsOverviewChart />
        </div>
        <div className="bg-emerald-200">2</div>
        <div className="bg-amber-200">3</div>
        <div className="bg-indigo-200">4</div>
        <div className="bg-teal-200">5</div>
      </div>
    </div>
  );
};
