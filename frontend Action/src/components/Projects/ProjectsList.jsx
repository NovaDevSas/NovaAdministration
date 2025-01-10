import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaTrash, FaMoneyBillWave, FaExpand, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ProjectDetailsModal from './ProjectDetailsModal';

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

const formatDate = (date) => {
  if (!date) return 'Sin Fecha';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const ProjectsList = ({ projects, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Mostrar 5 proyectos por página

  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const handleFinanceItemsRedirect = (projectId) => {
    navigate(`/finance-items/${projectId}`);
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const paginateProjects = (projects) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return projects.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-md">
      {projects.length === 0 ? (
        <div className="flex justify-center items-center h-48 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">
            No se encontraron proyectos. <span className="font-semibold">¡Agrega uno para empezar!</span>
          </p>
        </div>
      ) : (
        <>
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="py-3 px-4 text-gray-600 font-semibold">Nombre</th>
                <th className="py-3 px-4 text-gray-600 font-semibold">Descripción</th>
                <th className="py-3 px-4 text-gray-600 font-semibold">Estado</th>
                <th className="py-3 px-4 text-gray-600 font-semibold">Fecha de Creación</th>
                <th className="py-3 px-4 text-center text-gray-600 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginateProjects(projects).map((project, index) => (
                <tr
                  key={project._id}
                  className={`border-b hover:bg-gray-50 transition duration-150 ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <td className="py-3 px-4 truncate font-medium text-gray-800" title={project.name}>
                    {project.name}
                  </td>
                  <td className="py-3 px-4 truncate text-gray-600">
                    {project.description?.length > 50 ? (
                      <div
                        className="flex items-center gap-2 cursor-pointer hover:underline text-blue-600"
                        onClick={() => handleViewDetails(project)}
                        title="Haz clic para ver más detalles"
                      >
                        {`${project.description.slice(0, 50)}...`}
                        <FaExpand />
                      </div>
                    ) : (
                      project.description || 'Sin descripción'
                    )}
                  </td>
                  <td className="py-3 px-4">{statusBadge(project.status)}</td>
                  <td className="py-3 px-4 text-gray-600">{formatDate(project.startDate)}</td>
                  <td className="py-3 px-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleViewDetails(project)}
                      className="p-2 bg-yellow-100 text-yellow-600 rounded-full hover:bg-yellow-200 focus:ring-2 focus:ring-yellow-400 transition"
                      aria-label={`Ver detalles del proyecto: ${project.name}`}
                      title="Ver detalles"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => onEdit(project)}
                      className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 focus:ring-2 focus:ring-green-400 transition"
                      aria-label={`Editar proyecto: ${project.name}`}
                      title="Editar"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDelete(project)}
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 focus:ring-2 focus:ring-red-400 transition"
                      aria-label={`Eliminar proyecto: ${project.name}`}
                      title="Eliminar"
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={() => handleFinanceItemsRedirect(project._id)}
                      className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 focus:ring-2 focus:ring-green-400 transition"
                      aria-label={`Ítems financieros de: ${project.name}`}
                      title="Ítems Financieros"
                    >
                      <FaMoneyBillWave />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
          <div className="flex justify-between items-center mt-4 px-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-purple-500 transition disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="text-gray-600">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-purple-500 transition disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </>
      )}

      {/* Modal para mostrar detalles completos */}
      {isModalOpen && selectedProject && (
        <ProjectDetailsModal project={selectedProject} onClose={closeModal} />
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
      startDate: PropTypes.string, // Usar startDate como fecha de creación
      endDate: PropTypes.string,
      budget: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProjectsList;