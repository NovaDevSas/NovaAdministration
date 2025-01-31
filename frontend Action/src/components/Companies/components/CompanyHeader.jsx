import React from 'react';
import { FaPlus } from 'react-icons/fa';

const CompanyHeader = ({ onNewCompany }) => {
  return (
    <header className="relative mb-6">
      {/* Contenedor principal */}
      <div className="relative flex items-center justify-between">
        {/* Fondo dinámico */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              fill="rgba(198, 239, 206, 0.6)"
              d="M0,64L48,96C96,128,192,192,288,213.3C384,235,480,213,576,176C672,139,768,85,864,69.3C960,53,1056,75,1152,112C1248,149,1344,203,1392,229.3L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            />
          </svg>
        </div>

        {/* Título principal */}
        <h1
          role="heading"
          aria-level="1"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text z-20"
        >
          Gestión de Empresas
        </h1>

        {/* Botón para nueva empresa */}
        <button
          onClick={onNewCompany}
          className="relative ml-auto px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-transform duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 z-20 flex items-center"
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