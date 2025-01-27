import React from 'react';
import { FaProjectDiagram } from 'react-icons/fa';

const ProjectDropdown = ({ projects, selectedProjectId, handleProjectChange }) => (
  <div className="mb-6">
    <label htmlFor="project-select" className="block text-sm font-medium text-gray-700 mb-2">
      Selecciona un Proyecto
    </label>
    <div className="relative">
      {/* Icono a la izquierda */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaProjectDiagram className="text-gray-400" />
      </div>

      {/* Dropdown */}
      <select
        id="project-select"
        value={selectedProjectId}
        onChange={handleProjectChange}
        disabled={projects.length === 0}
        className={`w-full pl-10 pr-4 py-2 text-base border rounded-md shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 transition ${
          projects.length === 0
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
            : 'bg-white text-gray-700 border-gray-300'
        }`}
      >
        {/* Placeholder */}
        <option value="" disabled>
          {projects.length === 0 ? 'Cargando proyectos...' : 'Selecciona un proyecto'}
        </option>

        {/* Opciones dinámicas */}
        {projects.map((project) => (
          <option key={project._id} value={project._id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default ProjectDropdown;
