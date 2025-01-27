import React from 'react';
import { FaBuilding } from 'react-icons/fa';

const CompanyDropdown = ({ companies, selectedCompanyId, handleCompanyChange, isLoading }) => (
  <div className="mb-6">
    <label htmlFor="company-select" className="block text-sm font-medium text-gray-700 mb-2">
      Selecciona una Compañía
    </label>
    <div className="relative">
      {/* Icono de edificio */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <FaBuilding className="text-gray-400" />
      </div>

      {/* Dropdown */}
      <select
        id="company-select"
        value={selectedCompanyId}
        onChange={handleCompanyChange}
        disabled={isLoading || companies.length === 0}
        className={`block w-full pl-10 pr-4 py-2 text-sm border rounded-md shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 transition ${
          isLoading || companies.length === 0
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
            : 'bg-white text-gray-700 border-gray-300'
        }`}
        aria-label="Selector de Compañías"
      >
        {/* Placeholder dinámico */}
        <option value="" disabled>
          {isLoading ? 'Cargando compañías...' : 'Selecciona una compañía'}
        </option>

        {/* Opciones dinámicas */}
        {companies.map((company) => (
          <option key={company._id} value={company._id}>
            {company.name}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default CompanyDropdown;
