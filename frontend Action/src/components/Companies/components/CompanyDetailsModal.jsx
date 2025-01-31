import React from 'react';
import PropTypes from 'prop-types';
import {
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaIdBadge,
} from 'react-icons/fa';

const CompanyDetailsModal = ({ company, onClose }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-4xl w-full border-t-4 border-purple-500 transform transition-transform duration-300 scale-95 hover:scale-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center w-full">
            Detalles de la Empresa
          </h2>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Cerrar"
          >
            <FaTimes />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <FaBuilding className="text-purple-500 mr-2" />
            <strong className="text-gray-700">Nombre:</strong>
          </div>
          <div className="text-gray-800">{company.name || 'No disponible'}</div>

          <div className="flex items-center">
            <FaPhone className="text-purple-500 mr-2" />
            <strong className="text-gray-700">Contacto:</strong>
          </div>
          <div className="text-gray-800">{company.contact || 'No disponible'}</div>

          <div className="flex items-center">
            <FaEnvelope className="text-purple-500 mr-2" />
            <strong className="text-gray-700">Correo Electrónico:</strong>
          </div>
          <div className="text-gray-800">{company.email || 'No disponible'}</div>

          <div className="flex items-center">
            <FaIdBadge className="text-purple-500 mr-2" />
            <strong className="text-gray-700">Estado:</strong>
          </div>
          <div className="text-gray-800 capitalize">{company.status || 'No disponible'}</div>

          <div className="flex items-center">
            <FaIdBadge className="text-purple-500 mr-2" />
            <strong className="text-gray-700">Código:</strong>
          </div>
          <div className="text-gray-800">{company.code || 'No disponible'}</div>

          <div className="flex items-center">
            <FaIdBadge className="text-purple-500 mr-2" />
            <strong className="text-gray-700">NIT:</strong>
          </div>
          <div className="text-gray-800">{company.nit || 'No disponible'}</div>

          <div className="flex items-center">
            <FaMapMarkerAlt className="text-purple-500 mr-2" />
            <strong className="text-gray-700">Dirección:</strong>
          </div>
          <div className="text-gray-800">{company.address || 'No disponible'}</div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-lg hover:bg-purple-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

CompanyDetailsModal.propTypes = {
  company: PropTypes.shape({
    name: PropTypes.string,
    contact: PropTypes.string,
    email: PropTypes.string,
    status: PropTypes.string,
    code: PropTypes.string,
    nit: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CompanyDetailsModal;
