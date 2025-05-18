"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatCurrency } from "@/lib/utils";
import { MonthSelector } from "./month-selector";

const chartData = [
  {
    month: "Jan",
    salesPayment: 12000,
    payables: 8000,
    receivables: 15000,
    invoices: 18000,
    pettyCash: 2000,
    internalPayments: 5000,
  },
  {
    month: "Feb",
    salesPayment: 15000,
    payables: 9000,
    receivables: 16000,
    invoices: 20000,
    pettyCash: 2500,
    internalPayments: 6000,
  },
  {
    month: "Mar",
    salesPayment: 11000,
    payables: 7500,
    receivables: 14000,
    invoices: 17000,
    pettyCash: 1800,
    internalPayments: 4500,
  },
  {
    month: "Apr",
    salesPayment: 13000,
    payables: 8500,
    receivables: 17000,
    invoices: 19000,
    pettyCash: 2200,
    internalPayments: 5500,
  },
  {
    month: "May",
    salesPayment: 14000,
    payables: 9500,
    receivables: 18000,
    invoices: 21000,
    pettyCash: 2800,
    internalPayments: 6500,
  },
  {
    month: "Jun",
    salesPayment: 16000,
    payables: 10000,
    receivables: 20000,
    invoices: 22000,
    pettyCash: 3000,
    internalPayments: 7000,
  },
  {
    month: "Jul",
    salesPayment: 17000,
    payables: 11000,
    receivables: 21000,
    invoices: 23000,
    pettyCash: 3200,
    internalPayments: 7500,
  },
  {
    month: "Aug",
    salesPayment: 18000,
    payables: 12000,
    receivables: 22000,
    invoices: 24000,
    pettyCash: 3500,
    internalPayments: 8000,
  },
  {
    month: "Sep",
    salesPayment: 19000,
    payables: 13000,
    receivables: 23000,
    invoices: 25000,
    pettyCash: 3800,
    internalPayments: 8500,
  },
  {
    month: "Oct",
    salesPayment: 20000,
    payables: 14000,
    receivables: 24000,
    invoices: 26000,
    pettyCash: 4000,
    internalPayments: 9000,
  },
  {
    month: "Nov",
    salesPayment: 21000,
    payables: 15000,
    receivables: 25000,
    invoices: 27000,
    pettyCash: 4200,
    internalPayments: 9500,
  },
  {
    month: "Dec",
    salesPayment: 22000,
    payables: 16000,
    receivables: 26000,
    invoices: 28000,
    pettyCash: 4500,
    internalPayments: 10000,
  },
];

const chartConfig = {
  overview: {
    label: "Amount",
    color: "#000000",
    activeBg: "bg-gray-100",
    activeText: "text-gray-800",
  },
  salesPayment: {
    label: "Sales Payment",
    color: "#3b82f6",
    activeBg: "bg-blue-100",
    activeText: "text-blue-800",
  },
  payables: {
    label: "Payables",
    color: "#ef4444",
    activeBg: "bg-red-100",
    activeText: "text-red-800",
  },
  receivables: {
    label: "Receivables",
    color: "#10b981",
    activeBg: "bg-emerald-100",
    activeText: "text-emerald-800",
  },
  invoices: {
    label: "Invoices",
    color: "#f59e0b",
    activeBg: "bg-amber-100",
    activeText: "text-amber-800",
  },
  pettyCash: {
    label: "Petty Cash",
    color: "#8b5cf6",
    activeBg: "bg-violet-100",
    activeText: "text-violet-800",
  },
  internalPayments: {
    label: "Internal Payments",
    color: "#ec4899",
    activeBg: "bg-pink-100",
    activeText: "text-pink-800",
  },
} satisfies ChartConfig;

export function AccountsOverviewChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("salesPayment");
  const [selectedMonths, setSelectedMonths] = React.useState<string[]>(
    chartData.map((item) => item.month)
  );

  const handleMonthSelection = (months: string[]) => {
    setSelectedMonths(months);
  };

  const filteredData = chartData.filter((item) =>
    selectedMonths.includes(item.month)
  );

  // Calculate totals for each category
  const totals = React.useMemo(() => {
    return filteredData.reduce(
      (acc, curr) => {
        return {
          salesPayment: acc.salesPayment + curr.salesPayment,
          payables: acc.payables + curr.payables,
          receivables: acc.receivables + curr.receivables,
          invoices: acc.invoices + curr.invoices,
          pettyCash: acc.pettyCash + curr.pettyCash,
          internalPayments: acc.internalPayments + curr.internalPayments,
        };
      },
      {
        salesPayment: 0,
        payables: 0,
        receivables: 0,
        invoices: 0,
        pettyCash: 0,
        internalPayments: 0,
      }
    );
  }, [filteredData]);

  const chartKeys = Object.keys(chartConfig).filter(
    (key) => key !== "overview"
  ) as Array<keyof typeof chartConfig>;

  return (
    <Card className="pb-0">
      <CardHeader className="flex flex-col items-stretch space-y-0 p-0">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Finance Data for 2025</CardTitle>
              <CardDescription>
                Monthly financial data for the current year
              </CardDescription>
            </div>
            <MonthSelector
              allMonths={chartData.map((item) => item.month)}
              selectedMonths={selectedMonths}
              onSelect={handleMonthSelection}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={24}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCurrency(value, true)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="overview"
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                />
              }
            />
            <Bar
              dataKey={activeChart}
              fill={chartConfig[activeChart].color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <div className="flex flex-col border-t">
        <div className="flex">
          {chartKeys.map((chartKey, index) => {
            const isFirst = index === 0;
            const isLast = index === chartKeys.length - 1;
            const config = chartConfig[chartKey];

            return (
              <button
                key={chartKey}
                data-active={activeChart === chartKey}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                  ${activeChart === chartKey ? config.activeBg : "bg-muted"}
                  ${activeChart === chartKey ? config.activeText : "text-muted-foreground"}
                  ${isFirst ? "rounded-bl-lg" : ""}
                  ${isLast ? "rounded-br-lg" : ""}
                  hover:bg-opacity-80`}
                onClick={() => setActiveChart(chartKey)}
              >
                {config.label}
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
