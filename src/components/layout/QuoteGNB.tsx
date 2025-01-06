"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LineSeparator from "../common/LineSeparator";

interface Tab {
  id: number;
  label: string;
}

interface QuoteGNBProps {
  tabs: Tab[];
  initialTab?: number;
  onTabChange?: (tabId: number) => void; // Add onTabChange callback prop
}

export const QuoteGNB = ({
  tabs,
  initialTab = 0,
  onTabChange,
}: QuoteGNBProps) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
    router.push(`?tab=${tabId}`);
    onTabChange?.(tabId);
  };

  return (
    <nav
      role="navigation"
      aria-label="견적 내역 탭"
      className="w-full border-b border-solid px-[24px] tablet:px-[72px] border-gray-200 bg-white"
    >
      <div className="max-w-[1400px] mx-auto flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`py-4 text-lg font-bold transition-all duration-500 border-b-2 min-w-[120px] pc:text-xl pc:font-semibold ${
              activeTab === tab.id
                ? "text-black-400 border-black-400"
                : "text-gray-400 border-transparent"
            } hover:text-black`}
            role="tab"
            aria-selected={activeTab === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <LineSeparator direction="horizontal" />
    </nav>
  );
};

export default QuoteGNB;
