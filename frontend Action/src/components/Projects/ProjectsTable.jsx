import React from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaTrash, FaMoneyBillWave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const statusBadge = (status) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    processing: 'bg-yellow-100 text-yellow-800',
    expired: 'bg-gray-100 text-gray-800',
    scheduled: 'bg-blue-100 text-blue-800',
    error: 'bg-red-100 text-red-800',
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        statusColors[status?.toLowerCase()] || 'bg-gray-300 text-gray-700'
      }`}
      title={`Estado: ${status}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1) || 'N/A'}
    </span>
  );
};

const formatDate = (date) => {
  if (!date) return 'N/A';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const ProjectsTable = ({ filteredProjects, openModal, setConfirmDelete }) => {
  const navigate = useNavigate();

  const handleFinanceItemsRedirect = (projectId) => {
    navigate(`/finance-items/${projectId}`);
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md mt-4">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="py-3 px-4 text-gray-600 font-semibold">Nombre</th>
            <th className="py-3 px-4 text-gray-600 font-semibold">Estado</th>
            <th className="py-3 px-4 text-gray-600 font-semibold">Descripción</th>
            <th className="py-3 px-4 text-gray-600 font-semibold">Fechas</th>
            <th className="py-3 px-4 text-center text-gray-600 font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project, index) => (
            <tr
              key={project._id}
              className={`border-b hover:bg-gray-50 transition duration-150 ${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <td className="py-3 px-4 truncate" title={project.name}>
                {project.name}
              </td>
              <td className="py-3 px-4">{statusBadge(project.status)}</td>
              <td className="py-3 px-4 truncate" title={project.description}>
                {project.description || 'N/A'}
              </td>
              <td className="py-3 px-4">
                {formatDate(project.startDate)} - {formatDate(project.endDate)}
              </td>
              <td className="py-3 px-4 flex justify-center gap-4">
                <button
                  onClick={() => openModal(project)}
                  className="text-blue-500 hover:text-blue-700 focus:ring-2 focus:ring-blue-300 transition"
                  aria-label={`Editar proyecto ${project.name}`}
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => setConfirmDelete(project)}
                  className="text-red-500 hover:text-red-700 focus:ring-2 focus:ring-red-300 transition"
                  aria-label={`Eliminar proyecto ${project.name}`}
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => handleFinanceItemsRedirect(project._id)}
                  className="text-green-500 hover:text-green-700 focus:ring-2 focus:ring-green-300 transition"
                  aria-label={`Ver ítems financieros de ${project.name}`}
                >
                  <FaMoneyBillWave />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ProjectsTable.propTypes = {
  filteredProjects: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      status: PropTypes.string.isRequired,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
  setConfirmDelete: PropTypes.func.isRequired,
};

export default ProjectsTable;
