import React, { useState } from "react";

function Tabs({ tabs = [] }) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

  const ActiveContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className="w-full">
      {/* 🔹 Tabs Header (Equal Width) */}
      <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex justify-center items-center gap-2 py-3 sm:text-sm lg:text-lg font-semibold transition-colors border-b-2 ${
              activeTab === tab.id
                ? "text-primary border-primary "
                : "text-gray-600 border-transparent hover:text-primary"
            }`}
          >
            {tab.icon && <tab.icon size={22} />}
            {tab.label}
          </button>
        ))}
      </div>

      {/* 🔹 Active Tab Content */}
      <div className="mt-3 ">{ActiveContent}</div>
    </div>
  );
}

export default Tabs;
