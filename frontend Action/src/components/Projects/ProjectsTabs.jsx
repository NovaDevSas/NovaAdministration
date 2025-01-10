import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const ProjectsTabs = ({ activeTab, handleTabChange, projectCounts }) => {
  const tabs = [
    { key: 'all', label: 'Todos', color: 'bg-gray-200 text-gray-700 hover:bg-gray-300' },
    { key: 'active', label: 'Activos', color: 'bg-blue-500 text-white hover:bg-blue-600' },
    { key: 'completed', label: 'Completados', color: 'bg-green-500 text-white hover:bg-green-600' },
    { key: 'processing', label: 'En proceso', color: 'bg-yellow-500 text-white hover:bg-yellow-600' },
  ];

  // Guardar la pestaña activa en LocalStorage
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);
  
  useEffect(() => {
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab && tabs.some((tab) => tab.key === savedTab)) {
      handleTabChange(savedTab);
    }
  }, [handleTabChange, tabs]); // Incluye 'tabs' en las dependencias.
  
  // Cargar la pestaña activa desde LocalStorage al montar
  useEffect(() => {
    try {
      const savedTab = localStorage.getItem('activeTab');
      if (savedTab && tabs.some((tab) => tab.key === savedTab)) {
        handleTabChange(savedTab);
      }
    } catch (error) {
      console.error('Error al cargar la pestaña activa:', error);
    }
  }, [handleTabChange]);

  return (
    <div className="flex justify-center md:justify-start items-center flex-wrap gap-4 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => handleTabChange(tab.key)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 ${
            activeTab === tab.key
              ? `${tab.color} scale-105`
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          aria-label={`Filtrar por ${tab.label}`}
          aria-current={activeTab === tab.key ? 'page' : undefined}
        >
          <span className="flex items-center">
            {tab.label} <span className="ml-2 text-sm font-bold">({projectCounts[tab.key] || 0})</span>
          </span>
        </button>
      ))}
    </div>
  );
};

ProjectsTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  handleTabChange: PropTypes.func.isRequired,
  projectCounts: PropTypes.shape({
    all: PropTypes.number,
    active: PropTypes.number,
    completed: PropTypes.number,
    processing: PropTypes.number,
  }).isRequired,
};

export default ProjectsTabs;
