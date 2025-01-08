import React from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaTrash, FaMoneyBillWave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const statusBadge = (status) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    processing: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800',
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

const ProjectsList = ({ projects, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleFinanceItemsRedirect = (projectId) => {
    navigate(`/finance-items/${projectId}`);
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md mt-4">
      {projects.length === 0 ? (
        <div className="flex justify-center items-center h-40 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">
            No se encontraron proyectos. Agrega uno para empezar.
          </p>
        </div>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-3 px-4 text-gray-600 font-semibold">Nombre</th>
              <th className="py-3 px-4 text-gray-600 font-semibold">Descripción</th>
              <th className="py-3 px-4 text-gray-600 font-semibold">Estado</th>
              <th className="py-3 px-4 text-center text-gray-600 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr
                key={project._id}
                className={`border-b hover:bg-gray-50 transition duration-150 ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <td className="py-3 px-4 truncate" title={project.name}>
                  {project.name}
                </td>
                <td className="py-3 px-4 truncate" title={project.description}>
                  {project.description || 'N/A'}
                </td>
                <td className="py-3 px-4">{statusBadge(project.status)}</td>
                <td className="py-3 px-4 flex justify-center gap-4">
                  <button
                    onClick={() => onEdit(project)}
                    className="text-blue-500 hover:text-blue-700 transition"
                    aria-label={`Editar proyecto ${project.name}`}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(project)}
                    className="text-red-500 hover:text-red-700 transition"
                    aria-label={`Eliminar proyecto ${project.name}`}
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => handleFinanceItemsRedirect(project._id)}
                    className="text-green-500 hover:text-green-700 transition"
                    aria-label={`Ver ítems financieros de ${project.name}`}
                  >
                    <FaMoneyBillWave />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

ProjectsList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProjectsList;