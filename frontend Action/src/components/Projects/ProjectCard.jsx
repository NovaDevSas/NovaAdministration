import React from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaTrash } from 'react-icons/fa';

const statusBadge = (status) => {
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
    >
      {status?.charAt(0).toUpperCase() + status?.slice(1) || 'N/A'}
    </span>
  );
};

const ProjectCard = ({ project, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="py-4 px-6 text-gray-800">{project.name}</td>
      <td className="py-4 px-6 text-gray-600 truncate">{project.description || 'No disponible'}</td>
      <td className="py-4 px-6">{statusBadge(project.status)}</td>
      <td className="py-4 px-6">{project.startDate || 'N/A'}</td>
      <td className="py-4 px-6 flex gap-3 justify-center items-center">
        <button
          onClick={() => onEdit(project)}
          className="text-blue-500 hover:text-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-200"
          aria-label={`Editar proyecto ${project.name}`}
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(project)}
          className="text-red-500 hover:text-red-700 focus:ring-2 focus:ring-red-300 focus:outline-none transition duration-200"
          aria-label={`Eliminar proyecto ${project.name}`}
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
