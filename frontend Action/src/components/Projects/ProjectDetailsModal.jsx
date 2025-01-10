import React from 'react';
import PropTypes from 'prop-types';
import {
  FaCalendarAlt,
  FaFileAlt,
  FaInfoCircle,
  FaDollarSign,
  FaNetworkWired,
} from 'react-icons/fa';

const formatDate = (date) => {
  if (!date) return 'Sin Fecha';
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString('es-ES', options);
};

const ProjectDetailsModal = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg space-y-6">
        <h2 className="text-xl font-bold text-center text-purple-700">
          Detalles del Proyecto
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {/* Nombre */}
          <div className="flex items-center">
            <FaFileAlt className="text-purple-500 mr-2" />
            <strong className="text-gray-700">Nombre:</strong>
          </div>
          <div className="text-gray-800">{project.name || 'No disponible'}</div>

          {/* Descripción */}
          <div className="flex items-center">
            <FaInfoCircle className="text-purple-500 mr-2" />
            <strong className="text-gray-700">Descripción:</strong>
          </div>
          <div className="text-gray-800">{project.description || 'No disponible'}</div>

          {/* Estado */}
          <div className="flex items-center">
            <FaFileAlt className="text-purple-500 mr-2" />
            <strong className="text-gray-700">Estado:</strong>
          </div>
          <div className="text-gray-800 capitalize">{project.status || 'No disponible'}</div>

          {/* Fecha de Inicio */}
          <div className="flex items-center">
            <FaCalendarAlt className="text-purple-500 mr-2" />
            <strong className="text-gray-700">Inicio:</strong>
          </div>
          <div className="text-gray-800">{formatDate(project.startDate)}</div>

          {/* Fecha de Fin */}
          <div className="flex items-center">
            <FaCalendarAlt className="text-purple-500 mr-2" />
            <strong className="text-gray-700">Fin:</strong>
          </div>
          <div className="text-gray-800">{formatDate(project.endDate)}</div>

          {/* Presupuesto */}
          <div className="flex items-center">
            <FaDollarSign className="text-purple-500 mr-2" />
            <strong className="text-gray-700">Presupuesto:</strong>
          </div>
          <div className="text-gray-800">
            {project.budget
              ? `$${parseFloat(project.budget).toLocaleString('es-ES')}`
              : 'No disponible'}
          </div>

          {/* Puerto */}
          <div className="flex items-center">
            <FaNetworkWired className="text-purple-500 mr-2" />
            <strong className="text-gray-700">Puerto:</strong>
          </div>
          <div className="text-gray-800">{project.port || 'No disponible'}</div>

          {/* Host */}
          <div className="flex items-center">
            <FaNetworkWired className="text-purple-500 mr-2" />
            <strong className="text-gray-700">Host:</strong>
          </div>
          <div className="text-gray-800">{project.host || 'No disponible'}</div>

          {/* Subdominio */}
          <div className="flex items-center">
            <FaNetworkWired className="text-purple-500 mr-2" />
            <strong className="text-gray-700">Subdominio:</strong>
          </div>
          <div className="text-gray-800 break-words">
            <a
              href={`https://${project.subdomain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {project.subdomain || 'No disponible'}
            </a>
          </div>
        </div>

        {/* Botón de cerrar */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-purple-500 text-white rounded-lg shadow-lg hover:bg-purple-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

ProjectDetailsModal.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    budget: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    port: PropTypes.string,
    host: PropTypes.string,
    subdomain: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProjectDetailsModal;
