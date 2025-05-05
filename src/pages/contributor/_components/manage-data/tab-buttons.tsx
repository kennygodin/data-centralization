import { Button } from "@/components/ui/button";
import { useState } from "react";
import clsx from "clsx";

export type TabButton = {
  label: string;
  value: string;
};

const tabButtons: TabButton[] = [
  { label: "Income", value: "income" },
  { label: "Client", value: "client" },
  { label: "Prospect", value: "prospect" },
];

interface TabButtonsProps {
  onTabChange?: (value: string) => void;
}

export const TabButtons = ({ onTabChange }: TabButtonsProps) => {
  const [activeTab, setActiveTab] = useState(tabButtons[0].value);

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
