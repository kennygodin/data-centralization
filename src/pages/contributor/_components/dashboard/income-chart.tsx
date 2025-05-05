import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import { PeriodSelector } from "./period-selector";
import { formatCurrency } from "@/lib/utils";

const fullYearData = [
  { month: "January", income: 1230000 },
  { month: "February", income: 2150000 },
  { month: "March", income: 1780000 },
  { month: "April", income: 520000 },
  { month: "May", income: 1560000 },
  { month: "June", income: 1890000 },
  { month: "July", income: 2030000 },
  { month: "August", income: 1420000 },
  { month: "September", income: 1670000 },
  { month: "October", income: 2340000 },
  { month: "November", income: 1980000 },
  { month: "December", income: 2560000 },
];

const chartConfig = {
  income: {
    label: "Income",
    color: "#87CEEB",
  },
} satisfies ChartConfig;

export const IncomeChart = () => {
  const defaultPeriod = {
    label: "January - June",
    range: {
      from: new Date(new Date().getFullYear(), 0, 1), // Jan 1 of current year
      to: new Date(new Date().getFullYear(), 5, 30), // Jun 30 of current year
    },
  };

  const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod);

  const handlePeriodChange = (period: {
    label: string;
    range: { from: Date; to: Date };
  }) => {
    setSelectedPeriod(period);
    console.log("Selected period:", period);
  };

  const getFilteredData = () => {
    return selectedPeriod.label === "January - June"
      ? fullYearData.slice(0, 6)
      : fullYearData.slice(6);
  };

  const chartData = getFilteredData();
  const isFirstHalf = selectedPeriod.label === "January - June";

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <h3 className="text-lg text-slate-950 font-medium">Income Chart</h3>
        <PeriodSelector
          onPeriodChange={handlePeriodChange}
          initialPeriod={selectedPeriod}
        />
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
              formatter={(value) => [`${formatCurrency(value as number)}`]}
            />
            <Bar dataKey="income" fill="#87CEEB" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-xs">
        <div className="leading-none text-muted-foreground">
          Showing total income for{" "}
          {isFirstHalf ? "January - June" : "July - December"}
        </div>
      </CardFooter>
    </Card>
  );
};
