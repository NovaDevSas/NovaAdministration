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

  const isActive = company.status?.trim().toLowerCase() === 'activa';

  const handleCardClick = () => {
    navigate(`/projects/${company._id}`);
  };

  return (
    <div
      className={`relative p-4 rounded-md shadow-md transition-transform transform hover:scale-105 bg-white border ${
        isActive ? 'border-gray-200' : 'border-red-300'
      }`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
    >
      {/* Fondo decorativo */}
      {!isActive && (
        <div className="absolute inset-0 rounded-md bg-red-100 opacity-10 pointer-events-none"></div>
      )}

      {/* Encabezado */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-semibold text-gray-800 flex items-center truncate">
          {company.name || 'Sin nombre'}
          {isActive ? (
            <FaCheckCircle className="ml-2 text-green-500" title="Empresa activa" />
          ) : (
            <FaTimesCircle className="ml-2 text-red-500" title="Empresa inactiva" />
          )}
        </h3>
      </div>

      {/* Descripción y detalles */}
      <div className="space-y-2 text-gray-600 text-sm">
        <p>
          Estado: <span className={isActive ? 'text-green-500' : 'text-red-500'}>{isActive ? 'Activa' : 'Inactiva'}</span>
        </p>
        <p className="flex items-center truncate">
          <FaPhone className="mr-2 text-green-500" />
          {company.contact || 'No disponible'}
        </p>
        <p className="flex items-center truncate">
          <FaEnvelope className="mr-2 text-blue-500" />
          {company.email || 'No disponible'}
        </p>
        <p className="flex items-center truncate">
          <FaMapMarkerAlt className="mr-2 text-red-500" />
          {company.address || 'No disponible'}
        </p>
      </div>

      {/* Acciones */}
      <div className="mt-3 flex justify-end gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(company);
          }}
          className="px-2 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition"
          title="Editar Empresa"
        >
          <FaEdit />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(company);
          }}
          className="px-2 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-400 transition"
          title="Eliminar Empresa"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
