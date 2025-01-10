import React, { useState } from 'react';
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
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        statusColors[status?.toLowerCase()] || 'bg-gray-300 text-gray-700'
      }`}
      title={`Estado: ${status}`}
    >
      {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'N/A'}
    </span>
  );
};

const formatDate = (date) => {
  if (!date) return 'N/A';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  try {
    return new Date(date).toLocaleDateString(undefined, options);
  } catch {
    return 'Fecha inválida';
  }
};

const ProjectsTable = ({ filteredProjects, filters, setFilters, openModal, setConfirmDelete }) => {
  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFinanceItemsRedirect = (projectId) => {
    navigate(`/finance-items/${projectId}`);
  };

  return (
    <div className="mt-6">
      {/* Filtros avanzados */}
      <div className="mb-4 bg-white p-4 rounded-lg shadow-md">
        <form className="flex flex-wrap gap-4 items-center">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Todos</option>
              <option value="active">Activos</option>
              <option value="processing">En Proceso</option>
              <option value="completed">Completados</option>
              <option value="inactive">Inactivos</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de inicio
            </label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de fin
            </label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </form>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="py-3 px-4 text-gray-700 font-bold">Nombre</th>
              <th className="py-3 px-4 text-gray-700 font-bold">Estado</th>
              <th className="py-3 px-4 text-gray-700 font-bold">Descripción</th>
              <th className="py-3 px-4 text-gray-700 font-bold">Fechas</th>
              <th className="py-3 px-4 text-center text-gray-700 font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project._id} className="border-b hover:bg-gray-100 transition duration-150">
                <td className="py-3 px-4">{project.name}</td>
                <td className="py-3 px-4">{statusBadge(project.status)}</td>
                <td className="py-3 px-4">{project.description || 'Sin descripción'}</td>
                <td className="py-3 px-4">
                  {formatDate(project.startDate)} - {formatDate(project.endDate)}
                </td>
                <td className="py-3 px-4 flex justify-center gap-3">
                  <button onClick={() => openModal(project)} className="text-blue-600">
                    <FaEdit />
                  </button>
                  <button onClick={() => setConfirmDelete(project)} className="text-red-600">
                    <FaTrash />
                  </button>
                  <button onClick={() => handleFinanceItemsRedirect(project._id)} className="text-green-600">
                    <FaMoneyBillWave />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ProjectsTable.propTypes = {
  filteredProjects: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  setConfirmDelete: PropTypes.func.isRequired,
};

export default ProjectsTable;