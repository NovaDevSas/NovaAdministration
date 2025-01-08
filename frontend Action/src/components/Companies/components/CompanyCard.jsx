import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';

const CompanyCard = ({ company, onEdit, onDelete }) => {
  const navigate = useNavigate();

  // Determinar si la empresa está activa o inactiva
  const isActive = company.status?.trim().toLowerCase() === 'activa';

  const handleCardClick = () => {
    navigate(`/projects/${company._id}`);
  };

  return (
    <div
      className={`relative p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 bg-white border ${
        !isActive ? 'border-red-300' : 'border-gray-200'
      }`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
    >
      {/* Fondo decorativo con animación para las inactivas */}
      {!isActive && (
        <div className="absolute inset-0 rounded-lg bg-red-200 opacity-10 pointer-events-none transition-all duration-300"></div>
      )}

      {/* Encabezado */}
      <div className="flex justify-between items-center mb-3 relative">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          {company.name || 'Sin nombre'}
          {isActive ? (
            <FaCheckCircle
              className="ml-2 text-green-500"
              title="Empresa activa"
              aria-label="Activa"
            />
          ) : (
            <FaTimesCircle
              className="ml-2 text-red-500"
              title="Empresa inactiva"
              aria-label="Inactiva"
            />
          )}
        </h3>
      </div>

      {/* Descripción y detalles */}
      <div className="relative space-y-2 text-gray-700 text-sm">
        <p className="font-semibold">
          Estado: {isActive ? 'Activa' : 'Inactiva'}
        </p>
        <p className="flex items-center">
          <FaPhone className="mr-2 text-green-500" />
          Contacto: {company.contact || 'No disponible'}
        </p>
        <p className="flex items-center">
          <FaEnvelope className="mr-2 text-blue-500" />
          Correo: {company.email || 'No disponible'}
        </p>
        <p className="flex items-center">
          <FaMapMarkerAlt className="mr-2 text-red-500" />
          Dirección: {company.address || 'No disponible'}
        </p>
      </div>

      {/* Acciones */}
      <div className="mt-4 flex justify-end gap-2 relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(company);
          }}
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
        >
          <FaEdit />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(company);
          }}
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-400"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;