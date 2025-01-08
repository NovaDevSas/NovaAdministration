import React from 'react';
import { FaPlus } from 'react-icons/fa';

const CompanyHeader = ({ onNewCompany }) => {
  return (
    <header className="mb-6">
      {/* Contenedor principal con flex para alineación */}
      <div className="flex items-center justify-between">
        {/* Título principal */}
        <h1
          role="heading"
          aria-level="1"
          className="text-3xl font-extrabold text-gray-800 text-center flex-1 md:ml-52"
        >
          <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">
            Gestión de Empresas
          </span>
        </h1>

        {/* Botón para nueva empresa */}
        <button
          onClick={onNewCompany}
          className="ml-4 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-transform duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          aria-label="Abrir el formulario para crear una nueva empresa"
          title="Crear nueva empresa"
        >
          <FaPlus className="mr-2" />
          <span>Nueva Empresa</span>
        </button>
      </div>
    </header>
  );
};

export default CompanyHeader;
