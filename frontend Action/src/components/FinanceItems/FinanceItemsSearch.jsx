import React from 'react';
import PropTypes from 'prop-types';
import { FaSearch, FaTimes } from 'react-icons/fa';

const FinanceItemsSearch = ({ searchQuery, handleSearch }) => (
  <div className="relative w-full max-w-sm mx-auto mb-6"> {/* Agregar margen inferior */}
    {/* Campo de búsqueda */}
    <input
      type="text"
      placeholder="Buscar..."
      value={searchQuery}
      onChange={handleSearch}
      aria-label="Buscar ítems financieros"
      className="w-full py-2 pl-9 pr-10 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 hover:border-purple-400 transition-all"
    />

    {/* Icono de búsqueda */}
    <FaSearch
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      aria-hidden="true"
    />

    {/* Botón para limpiar búsqueda */}
    {searchQuery && (
      <button
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 transition"
        onClick={() => handleSearch({ target: { value: '' } })}
        aria-label="Limpiar búsqueda"
      >
        <FaTimes />
      </button>
    )}
  </div>
);

FinanceItemsSearch.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default FinanceItemsSearch;