import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";
import { LucideIcon, Plus, Minus } from "lucide-react";

export type CardData = {
  id: number;
  title: string;
  icon: LucideIcon;
  currentMonthValue: number | string;
  lastMonthValue?: number | string;
  isDate?: boolean;
  isCurrency?: boolean;
};

export const DashboardCard = ({ data }: { data: CardData[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((item) => (
        <Card key={item.id} className="gap-2 py-4 overflow-hidden shadow-none">
          <CardHeader className="flex flex-row items-center gap-1">
            <item.icon className="text-slate-600" size={15} />
            <CardTitle className="text-sm text-slate-500 font-medium">
              {item.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">
              {item.isCurrency
                ? formatCurrency(item.currentMonthValue as number)
                : item.currentMonthValue}
            </div>
          </CardContent>
          <CardFooter className="text-xs">
            {item.lastMonthValue !== undefined && (
              <div className="flex items-center text-muted-foreground">
                {(item.currentMonthValue as number) >
                (item.lastMonthValue as number) ? (
                  <Plus className="h-4 w-4 text-emerald-600" />
                ) : (
                  <Minus className="h-3 w-3 text-rose-600" />
                )}
                <div>
                  <span
                    className={cn(
                      "mr-1 font-semibold",
                      (item.currentMonthValue as number) >
                        (item.lastMonthValue as number)
                        ? "text-emerald-600"
                        : "text-rose-600"
                    )}
                  >
                    {Math.abs(
                      (((item.currentMonthValue as number) -
                        (item.lastMonthValue as number)) /
                        (item.lastMonthValue as number)) *
                        100
                    ).toFixed(0)}
                    %
                  </span>
                  against last month
                </div>
              </div>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
