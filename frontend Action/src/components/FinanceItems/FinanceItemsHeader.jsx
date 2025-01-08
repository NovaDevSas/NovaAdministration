import React from 'react';
import PropTypes from 'prop-types';

const FinanceItemsHeader = ({ openModal }) => (
  <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
    {/* Título */}
    <h1
      className="text-3xl font-bold text-gray-800 text-center sm:text-left"
      aria-label="Sección Ítems Financieros"
    >
      Ítems Financieros
    </h1>

    {/* Botón para nuevo ítem */}
    <button
      onClick={() => openModal()}
      className="mt-4 sm:mt-0 px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      aria-label="Crear nuevo ítem financiero"
    >
      Nuevo Ítem
    </button>
  </div>
);

FinanceItemsHeader.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default FinanceItemsHeader;
