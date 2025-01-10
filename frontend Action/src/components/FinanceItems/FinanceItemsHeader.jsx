import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';

const FinanceItemsHeader = ({ openModal }) => (
  <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
    {/* Título con detalles adicionales */}
    <div className="text-center sm:text-left">
      <h1
        className="text-3xl font-bold text-purple-700"
        aria-label="Sección Ítems Financieros"
      >
        Ítems Financieros
      </h1>
      <p className="text-sm text-gray-500 mt-1">
        Administra y organiza tus ingresos y gastos con facilidad.
      </p>
    </div>

    {/* Botón para nuevo ítem */}
    <button
      onClick={() => openModal()}
      className="mt-4 sm:mt-0 flex items-center px-6 py-2 bg-purple-700 text-white font-semibold rounded-lg shadow-md hover:bg-purple-800 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      aria-label="Crear nuevo ítem financiero"
    >
      <FaPlus className="mr-2" />
      Nuevo Ítem
    </button>
  </div>
);

FinanceItemsHeader.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default FinanceItemsHeader;
