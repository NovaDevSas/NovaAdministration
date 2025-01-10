import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaTrash, FaExpand, FaCompress } from 'react-icons/fa';

const StatusBadge = ({ status }) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800',
    inactive: 'bg-red-100 text-red-800',
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${
        statusColors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800'
      }`}
      title={`Estado: ${status?.charAt(0).toUpperCase() + status?.slice(1) || 'N/A'}`}
    >
      {status?.charAt(0).toUpperCase() + status?.slice(1) || 'N/A'}
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

const formatDate = (date) => {
  if (!date) return 'N/A';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <tr className="hover:bg-gray-50 transition">
      {/* Nombre del proyecto */}
      <td className="py-4 px-6 font-medium text-gray-800 truncate" title={project.name}>
        {project.name}
      </td>

      {/* Descripción */}
      <td className="py-4 px-6 text-gray-600">
        {project.description?.length > 50 && !showFullDescription ? (
          <div className="flex items-center gap-2">
            <span>{`${project.description.slice(0, 50)}...`}</span>
            <button
              onClick={() => setShowFullDescription(true)}
              className="text-blue-500 hover:text-blue-700 transition"
              aria-label="Ver descripción completa"
            >
              <FaExpand />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span>{project.description || 'No disponible'}</span>
            {project.description?.length > 50 && (
              <button
                onClick={() => setShowFullDescription(false)}
                className="text-blue-500 hover:text-blue-700 transition"
                aria-label="Ocultar descripción completa"
              >
                <FaCompress />
              </button>
            )}
          </div>
        )}
      </td>

      {/* Estado */}
      <td className="py-4 px-6">
        <StatusBadge status={project.status} />
      </td>

      {/* Fecha */}
      <td className="py-4 px-6 text-gray-500">{formatDate(project.startDate)}</td>

      {/* Acciones */}
      <td className="py-4 px-6 flex gap-4 justify-center items-center">
        <button
          onClick={() => onEdit(project)}
          className="p-2 bg-blue-100 text-blue-500 rounded-full hover:bg-blue-200 focus:ring-2 focus:ring-blue-300 transition"
          aria-label={`Editar proyecto: ${project.name}`}
          title="Editar"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(project)}
          className="p-2 bg-red-100 text-red-500 rounded-full hover:bg-red-200 focus:ring-2 focus:ring-red-300 transition"
          aria-label={`Eliminar proyecto: ${project.name}`}
          title="Eliminar"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.string.isRequired,
    startDate: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProjectCard;
