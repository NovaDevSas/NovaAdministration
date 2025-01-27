import React from 'react';
import { FaProjectDiagram } from 'react-icons/fa';

const ProjectDropdown = ({ projects, selectedProjectId, handleProjectChange }) => (
  <div className="mb-4">
    <label htmlFor="project-select" className="block text-sm font-medium text-gray-700 mb-1">
      Selecciona un Proyecto
    </label>
    <div className="relative">
      <select
        id="project-select"
        value={selectedProjectId}
        onChange={handleProjectChange}
        disabled={projects.length === 0}
        className={`mt-1 block w-full pl-10 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${
          projects.length === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''
        }`}
      >
        <option value="" disabled>
          {projects.length === 0 ? 'Cargando proyectos...' : 'Selecciona un proyecto'}
        </option>
        {projects.map((project) => (
          <option key={project._id} value={project._id}>
            {project.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaProjectDiagram className="text-gray-400" />
      </div>
    </div>
  </div>
);

export default ProjectDropdown;