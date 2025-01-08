import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';

const ProjectsHeader = ({ companyName, filteredProjects = [], onNewProject }) => (
  <div className="flex flex-col md:flex-row md:justify-between items-center mb-6">
    {/* Título y Contador */}
    <div className="text-center md:text-left">
      <h1 className="text-3xl font-extrabold text-purple-700">
        Proyectos de {companyName}
      </h1>
      <p className="text-gray-500 text-sm mt-2">
        {filteredProjects.length
          ? `${filteredProjects.length} proyecto${filteredProjects.length > 1 ? 's' : ''} encontrado${filteredProjects.length > 1 ? 's' : ''}`
          : 'No se encontraron proyectos.'}
      </p>
    </div>

    {/* Botón de Crear Proyecto */}
    <div className="mt-4 md:mt-0">
      <button
        onClick={onNewProject}
        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-transform transform hover:scale-105"
        aria-label="Crear nuevo proyecto"
      >
        <FaPlus className="text-white" /> Crear Proyecto
      </button>
    </div>
  </div>
);

ProjectsHeader.propTypes = {
  companyName: PropTypes.string.isRequired,
  filteredProjects: PropTypes.array.isRequired,
  onNewProject: PropTypes.func.isRequired,
};

export default ProjectsHeader;