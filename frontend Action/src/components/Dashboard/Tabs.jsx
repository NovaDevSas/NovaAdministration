import React, { useState } from 'react';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <div className="w-full">
      {/* Encabezados de las pestañas */}
      <div className="flex justify-center space-x-4 border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`px-6 py-2 text-base font-medium transition-colors duration-300 rounded-t-lg ${
              activeTab === tab.label
                ? 'text-purple-700 border-b-2 border-purple-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido de las pestañas */}
      <div className="mt-6">
        {tabs.map((tab) =>
          activeTab === tab.label ? (
            <div
              key={tab.label}
              className="animate-fade-in bg-gray-50 p-6 rounded-lg shadow-md"
            >
              {tab.content}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Tabs;
