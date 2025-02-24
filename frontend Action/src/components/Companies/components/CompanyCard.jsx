import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
} from 'react-icons/fa';
import CompanyDetailsModal from './CompanyDetailsModal';

const CompanyCard = ({ company, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isActive = company.status?.trim().toLowerCase() === 'activa';
  const isLead = company.status?.trim().toLowerCase() === 'lead';

  const handleCardClick = () => {
    navigate(`/projects/${company._id}`);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <div
      className={`relative p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 bg-white border ${
        isActive ? 'border-green-500' : isLead ? 'border-yellow-500' : 'border-red-500'
      }`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
    >
      {/* Fondo decorativo */}
      {!isActive && !isLead && (
        <div className="absolute inset-0 rounded-lg bg-red-100 opacity-10 pointer-events-none"></div>
      )}
      {isLead && (
        <div className="absolute inset-0 rounded-lg bg-yellow-100 opacity-10 pointer-events-none"></div>
      )}

      {/* Encabezado */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center truncate">
          {company.name || 'Sin nombre'}
          {isActive ? (
            <FaCheckCircle className="ml-2 text-green-500" title="Empresa activa" />
          ) : isLead ? (
            <FaCheckCircle className="ml-2 text-yellow-500" title="Empresa lead" />
          ) : (
            <FaTimesCircle className="ml-2 text-red-500" title="Empresa inactiva" />
          )}
        </h3>
      </div>

      {/* Descripción y detalles */}
      <div className="space-y-3 text-gray-600 text-sm">
        <p>
          Estado: <span className={isActive ? 'text-green-500' : isLead ? 'text-yellow-500' : 'text-red-500'}>{isActive ? 'Activa' : isLead ? 'Lead' : 'Inactiva'}</span>
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
      <div className="mt-4 flex justify-end gap-3">
        <button
          onClick={handleViewDetails}
          className="px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 transition"
          title="Ver Detalles"
        >
          <FaEye />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(company);
          }}
          className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition"
          title="Editar Empresa"
        >
          <FaEdit />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(company);
          }}
          className="px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 transition"
          title="Eliminar Empresa"
        >
          <FaTrash />
        </button>
      </div>

      {/* Modal de detalles */}
      {isModalOpen && (
        <CompanyDetailsModal
          company={company}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CompanyCard;