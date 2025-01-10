import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaCalendarAlt, FaExclamationCircle } from 'react-icons/fa';

const priorityBadge = (priority) => {
  const colors = {
    high: 'bg-red-100 text-red-700 hover:bg-red-200',
    medium: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
    low: 'bg-green-100 text-green-700 hover:bg-green-200',
  };

  if (!priority) {
    return (
      <span
        className="px-2 py-1 rounded-full text-xs bg-gray-300 text-gray-700"
        role="status"
        aria-label="Sin prioridad"
      >
        N/A
      </span>
    );
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition duration-200 ${colors[priority.toLowerCase()]}`}
      role="status"
      aria-label={`Prioridad: ${priority}`}
      title={`Prioridad: ${priority.charAt(0).toUpperCase() + priority.slice(1)}`}
    >
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};

const formatDate = (date) => {
  if (!date) return 'Sin Fecha';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  try {
    return new Date(date).toLocaleDateString(undefined, options);
  } catch {
    return 'Fecha Inválida';
  }
};

const ProjectsGrid = ({ filteredProjects, openModal, setConfirmDelete }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDelete = (project) => {
    setIsProcessing(true);
    setConfirmDelete(project);
    setTimeout(() => setIsProcessing(false), 500); // Simulación de retraso
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProjects.map((p) => (
        <div
          key={p._id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transform hover:scale-105 transition duration-300 relative"
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
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FaCalendarAlt />
              <span>
                {`${formatDate(p.startDate)} - ${formatDate(p.endDate)}`}
              </span>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-between gap-2">
            <button
              onClick={() => openModal(p)}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-300"
              title="Editar Proyecto"
              aria-label={`Editar proyecto ${p.name}`}
              disabled={isProcessing}
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(p)}
              className={`flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none transition duration-300 ${
                isProcessing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              title="Eliminar Proyecto"
              aria-label={`Eliminar proyecto ${p.name}`}
              disabled={isProcessing}
            >
              {isProcessing ? 'Procesando...' : 'Eliminar'}
            </button>
          </div>

          {/* Icono de alta prioridad */}
          {p.priority?.toLowerCase() === 'high' && (
            <FaExclamationCircle
              className="absolute top-4 right-4 text-red-500"
              title="Alta prioridad"
              aria-label="Alta prioridad"
            />
          )}
        </div>
      ))}
    </div>
  );
};

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
