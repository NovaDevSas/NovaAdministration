import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const typeIcon = (type, amount) => {
  const icons = {
    income: <FaArrowUp className="text-green-600 text-xl" />,
    expense: <FaArrowDown className="text-red-400 text-xl" />,
  };

  return (
    <span
      className={`text-xl ${
        amount < 0 && type === 'expense' ? 'text-red-400' : 'text-green-600'
      }`}
      role="img"
      aria-label={type === 'income' ? 'Ingreso' : 'Gasto'}
    >
      {icons[type] || '❔'}
    </span>
  );
};

const formatDate = (date) => {
  if (!date) return 'Sin Fecha';
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const FinanceItemCard = ({ item, onEdit, onDelete }) => {
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);

  const toggleDescriptionModal = () => {
    setIsDescriptionModalOpen(!isDescriptionModalOpen);
  };

  return (
    <div className="flex flex-col bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Encabezado */}
      <div className="flex items-center mb-2">
        {typeIcon(item.type, item.amount)}
        <h3 className="ml-3 text-base font-semibold text-gray-800 truncate">
          {item.name || 'Sin nombre'}
        </h3>
      </div>

      {/* Información */}
      <div className="flex-1 space-y-1">
        <p className="text-sm text-gray-600">
          <strong>Monto:</strong>{' '}
          <span
            className={`font-semibold ${
              item.amount > 0
                ? 'text-green-600'
                : item.amount < 0
                ? 'text-red-400'
                : 'text-gray-600'
            }`}
          >
            ${Math.abs(item.amount).toFixed(2)}
          </span>
        </p>
        <p className="text-sm text-gray-600">
          <strong>Fecha:</strong> {formatDate(item.date)}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Descripción:</strong>{' '}
          {item.description?.length > 40 ? (
            <button
              onClick={toggleDescriptionModal}
              className="text-blue-500 hover:underline focus:outline-none"
            >
              Ver completa
            </button>
          ) : (
            <span>{item.description || 'No disponible'}</span>
          )}
        </p>
      </div>

      {/* Botones */}
      <div className="flex justify-end mt-3 space-x-2">
        <button
          onClick={() => onEdit(item)}
          className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label={`Editar ${item.name}`}
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(item)}
          className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
          aria-label={`Eliminar ${item.name}`}
        >
          <FaTrash />
        </button>
      </div>

      {/* Modal para descripción completa */}
      {isDescriptionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md relative">
            <button
              onClick={toggleDescriptionModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              aria-label="Cerrar descripción"
            >
              ×
            </button>
            <h3 className="text-lg font-semibold mb-4 text-center">Descripción Completa</h3>
            <p className="text-gray-700 text-sm">{item.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

FinanceItemCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    type: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default FinanceItemCard;
