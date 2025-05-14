import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useSearchParams } from "react-router-dom";

export type TabButton = {
  label: string;
  value: string;
};

const tabButtons: TabButton[] = [
  { label: "Salary Payments", value: "salary-payments" },
  { label: "Payables", value: "payables" },
  { label: "Receivables", value: "receivables" },
  { label: "Petty Cash", value: "petty-cash" },
  { label: "Journals", value: "journals" },
  { label: "Financial Statements", value: "financial-statement" },
  { label: "Invoices", value: "invoices" },
  { label: "Internal Payments", value: "internal-payments" },
];

interface TabButtonsProps {
  onTabChange?: (value: string) => void;
  activeTab?: string;
}

export const TabButtons = ({
  onTabChange,
  activeTab: propActiveTab,
}: TabButtonsProps) => {
  const [searchParams] = useSearchParams();
  const urlTab = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(
    propActiveTab || urlTab || tabButtons[0].value
  );

  useEffect(() => {
    if (urlTab && urlTab !== activeTab) {
      setActiveTab(urlTab);
    }
  }, [urlTab, activeTab]);

  const handleTabClick = (value: string) => {
    setActiveTab(value);
    if (onTabChange) {
      onTabChange(value);
    }
  };

  return (
    <div className="flex border-b">
      {tabButtons.map((tab) => (
        <Button
          key={tab.value}
          variant="ghost"
          onClick={() => handleTabClick(tab.value)}
          className={clsx(
            "rounded-none shadow-none border-b-2 border-transparent",
            "hover:bg-transparent hover:text-primary",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
            {
              "border-b-primary text-primary": activeTab === tab.value,
              "text-muted-foreground": activeTab !== tab.value,
            }
          )}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};
