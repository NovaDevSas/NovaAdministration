import React from 'react';
import PropTypes from 'prop-types';

const FinanceItemsSearch = ({ searchQuery, handleSearch }) => (
  <div className="relative">
    <input
      type="text"
      placeholder="Buscar por nombre o descripción..."
      value={searchQuery}
      onChange={handleSearch}
      aria-label="Buscar ítems financieros"
      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 hover:border-purple-400 transition-all"
    />
    {searchQuery && (
      <div
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-purple-500 transition"
        onClick={() => handleSearch({ target: { value: '' } })}
        aria-label="Limpiar búsqueda"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch({ target: { value: '' } })}
      >
        ✕
      </div>
    )}
  </div>
);

FinanceItemsSearch.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default FinanceItemsSearch;
