import React from 'react';

const ProjectsTabs = ({ activeTab, handleTabChange }) => {
  const tabColors = {
    all: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    active: 'bg-blue-500 text-white hover:bg-blue-600',
    completed: 'bg-green-500 text-white hover:bg-green-600',
    'on hold': 'bg-yellow-500 text-white hover:bg-yellow-600',
  };

  return (
    <div className="flex justify-center md:justify-start items-center flex-wrap gap-4 mb-6">
      {['all', 'active', 'completed', 'on hold'].map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabChange(tab)}
          className={`px-4 py-2 rounded-lg transition duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            activeTab === tab
              ? tabColors[tab]
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          aria-label={`Filtrar por ${tab}`}
          aria-current={activeTab === tab ? 'page' : undefined}
        >
          {tab === 'all' ? 'Todos' : `Estado ${tab.charAt(0).toUpperCase() + tab.slice(1)}`}
        </button>
      ))}
    </div>
  );
};

export default ProjectsTabs;