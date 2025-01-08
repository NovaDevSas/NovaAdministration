import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

const CompanySearch = ({ searchQuery, onSearchChange }) => {
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (debouncedQuery.trim() !== searchQuery) {
        onSearchChange(debouncedQuery.trim());
      }
    }, 300); // Retraso de 300 ms para el debounce

    return () => clearTimeout(handler); // Limpiar el timeout al desmontar
  }, [debouncedQuery, searchQuery, onSearchChange]);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Ícono de búsqueda */}
      <FaSearch
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        aria-hidden="true"
      />
      
      {/* Campo de entrada */}
      <input
        type="text"
        placeholder="Buscar empresas..."
        value={debouncedQuery}
        onChange={(e) => setDebouncedQuery(e.target.value)}
        className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 ease-in-out"
        aria-label="Buscar empresas por nombre"
        autoComplete="off"
      />
      
      {/* Mensaje accesible para lectores de pantalla */}
      <div
        aria-live="polite"
        className="sr-only"
      >
        {debouncedQuery
          ? `Mostrando resultados para "${debouncedQuery}".`
          : 'Ingrese texto para buscar empresas.'}
      </div>
    </div>
  );
};

CompanySearch.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default CompanySearch;