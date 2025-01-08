import React from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaTrash } from 'react-icons/fa';

const FinanceItemCard = ({ item, onEdit, onDelete }) => (
  <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
    {/* Encabezado */}
    <h3 className="text-lg font-bold text-gray-800 mb-3">
      {item.name || 'Sin nombre'}
    </h3>

    {/* Información del ítem */}
    <div className="space-y-1">
      <p className="text-sm text-gray-600">
        <strong>Monto:</strong> ${item.amount.toFixed(2)}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Fecha:</strong> {item.date || 'No especificada'}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Descripción:</strong>{' '}
        {item.description || <span className="italic text-gray-400">No disponible</span>}
      </p>
    </div>

    {/* Botones de acción */}
    <div className="flex justify-end mt-4 space-x-3">
      <button
        onClick={() => onEdit(item)}
        className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-label={`Editar ${item.name}`}
      >
        <FaEdit className="mr-2" />
        Editar
      </button>
      <button
        onClick={() => onDelete(item)}
        className="flex items-center px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
        aria-label={`Eliminar ${item.name}`}
      >
        <FaTrash className="mr-2" />
        Eliminar
      </button>
    </div>
  </div>
);

FinanceItemCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default FinanceItemCard;
