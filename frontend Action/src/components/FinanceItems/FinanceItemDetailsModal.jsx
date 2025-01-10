import React from 'react';
import PropTypes from 'prop-types';
import { FaDollarSign, FaCalendarAlt, FaFileAlt } from 'react-icons/fa';

const formatDate = (date) => {
  if (!date) return 'Sin Fecha';
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const FinanceItemDetailsModal = ({ financeItem, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg shadow-2xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
          Detalles del Ítem Financiero
        </h2>
        <div className="space-y-4">
          {/* Nombre */}
          <div className="flex items-center">
            <FaFileAlt className="text-purple-500 mr-3" />
            <strong className="text-gray-700 mr-2">Nombre:</strong>
            <span className="text-gray-800">{financeItem.name || 'No disponible'}</span>
          </div>

          {/* Tipo */}
          <div className="flex items-center">
            <FaFileAlt className="text-purple-500 mr-3" />
            <strong className="text-gray-700 mr-2">Tipo:</strong>
            <span className="text-gray-800 capitalize">{financeItem.type || 'No disponible'}</span>
          </div>

          {/* Monto */}
          <div className="flex items-center">
            <FaDollarSign className="text-green-500 mr-3" />
            <strong className="text-gray-700 mr-2">Monto:</strong>
            <span className="text-gray-800">${financeItem.amount?.toLocaleString() || '0.00'}</span>
          </div>

          {/* Costos */}
          <div className="flex items-center">
            <FaDollarSign className="text-red-500 mr-3" />
            <strong className="text-gray-700 mr-2">Costos:</strong>
            <span className="text-gray-800">${financeItem.costs?.toLocaleString() || '0.00'}</span>
          </div>

          {/* Ingresos */}
          <div className="flex items-center">
            <FaDollarSign className="text-blue-500 mr-3" />
            <strong className="text-gray-700 mr-2">Ingresos:</strong>
            <span className="text-gray-800">${financeItem.income?.toLocaleString() || '0.00'}</span>
          </div>

          {/* Fecha */}
          <div className="flex items-center">
            <FaCalendarAlt className="text-purple-500 mr-3" />
            <strong className="text-gray-700 mr-2">Fecha:</strong>
            <span className="text-gray-800">{formatDate(financeItem.date)}</span>
          </div>

          {/* Descripción */}
          <div className="flex items-start">
            <FaFileAlt className="text-purple-500 mr-3 mt-1" />
            <div>
              <strong className="text-gray-700 block">Descripción:</strong>
              <span className="text-gray-800">
                {financeItem.description || 'No disponible'}
              </span>
            </div>
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

FinanceItemDetailsModal.propTypes = {
  financeItem: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    costs: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    income: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    date: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FinanceItemDetailsModal;
