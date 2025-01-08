import React from 'react';
import PropTypes from 'prop-types';

const priorityBadge = (priority) => {
  const colors = {
    high: 'bg-red-500 text-white hover:bg-red-600',
    medium: 'bg-yellow-400 text-black hover:bg-yellow-500',
    low: 'bg-green-500 text-white hover:bg-green-600',
  };

  if (!priority) {
    return (
      <span
        className="px-2 py-1 rounded-full text-sm bg-gray-300 text-gray-700"
        role="status"
        aria-label="Sin prioridad"
      >
        N/A
      </span>
    );
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition duration-200 ${colors[priority.toLowerCase()]}`}
      role="status"
      aria-label={`Prioridad: ${priority}`}
      title={`Prioridad: ${priority.charAt(0).toUpperCase() + priority.slice(1)}`}
    >
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};

const formatDate = (date) => {
  if (!date) return 'N/A';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const ProjectsGrid = ({ filteredProjects, openModal, setConfirmDelete }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredProjects.map((p) => (
      <div
        key={p._id}
        className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transform hover:scale-105 transition duration-300"
      >
        {/* Nombre del proyecto */}
        <h3
          className="text-lg font-semibold text-purple-700 truncate"
          title={p.name}
        >
          {p.name}
        </h3>
        
        {/* Descripción del proyecto */}
        <p className="text-gray-600 mb-3 truncate" title={p.description}>
          {p.description || 'Sin descripción'}
        </p>

        {/* Prioridad y fechas */}
        <div className="flex justify-between items-center mb-4">
          {priorityBadge(p.priority)}
          <span
            className="block text-sm text-gray-500"
            aria-label={`Fechas: ${formatDate(p.startDate)} - ${formatDate(p.endDate)}`}
          >
            {`${formatDate(p.startDate)} - ${formatDate(p.endDate)}`}
          </span>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-between">
          <button
            onClick={() => openModal(p)}
            className="flex-1 mr-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-300"
            title="Editar Proyecto"
            aria-label={`Editar proyecto ${p.name}`}
          >
            Editar
          </button>
          <button
            onClick={() => setConfirmDelete(p)}
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none transition duration-300"
            title="Eliminar Proyecto"
            aria-label={`Eliminar proyecto ${p.name}`}
          >
            Eliminar
          </button>
        </div>
      </div>
    ))}
  </div>
);

ProjectsGrid.propTypes = {
  filteredProjects: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      priority: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
  setConfirmDelete: PropTypes.func.isRequired,
};

export default ProjectsGrid;
