import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

const CompanySearch = ({ searchQuery, onSearchChange }) => {
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery || ''); // Asegurar un valor inicial

  useEffect(() => {
    const handler = setTimeout(() => {
      if (
        debouncedQuery.trim() !== searchQuery && // Verificar cambios
        typeof onSearchChange === 'function' // Asegurarse de que onSearchChange es una función
      ) {
        onSearchChange(debouncedQuery.trim());
      }
    }, 300); // Retraso de 300 ms para el debounce

    return () => clearTimeout(handler); // Limpiar el timeout al desmontar
  }, [debouncedQuery, searchQuery, onSearchChange]);

  const handleInputChange = (e) => {
    if (e?.target?.value !== undefined) {
      setDebouncedQuery(e.target.value); // Actualizar el valor del estado
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Ícono de búsqueda */}
      <FaSearch
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500"
        aria-hidden="true"
      />

      {/* Campo de entrada */}
      <input
        type="text"
        placeholder="Buscar empresas..."
        value={debouncedQuery}
        onChange={handleInputChange} // Manejo seguro del evento
        className="w-full p-3 pl-10 border border-gray-300 rounded-xl bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 ease-in-out placeholder-gray-400"
        aria-label="Buscar empresas por nombre"
        autoComplete="off"
      />

      {/* Mensaje accesible para lectores de pantalla */}
      <div aria-live="polite" className="sr-only">
        {debouncedQuery
          ? `Mostrando resultados para "${debouncedQuery}".`
          : 'Ingrese texto para buscar empresas.'}
      </div>
    </div>
  );
};

CompanySearch.propTypes = {
  searchQuery: PropTypes.string, // Permitir null o undefined de manera segura
  onSearchChange: PropTypes.func.isRequired,
};

export default CompanySearch;