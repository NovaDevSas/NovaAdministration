import React from 'react';
import { FaBuilding } from 'react-icons/fa';

const CompanyDropdown = ({ companies, selectedCompanyId, handleCompanyChange, isLoading }) => (
  <div className="mb-4">
    <label htmlFor="company-select" className="block text-sm font-medium text-gray-700">
      Selecciona una Compañía
    </label>
    <div className="relative">
      <FaBuilding className="absolute top-2/4 left-3 transform -translate-y-2/4 text-gray-500" />
      <select
        id="company-select"
        value={selectedCompanyId}
        onChange={handleCompanyChange}
        disabled={isLoading || companies.length === 0}
        className={`mt-1 block w-full pl-10 pr-10 py-2 text-base border ${
          isLoading || companies.length === 0 ? 'bg-gray-200' : 'bg-white'
        } border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md`}
        aria-label="Selector de Compañías"
      >
        {isLoading ? (
          <option>Cargando compañías...</option>
        ) : companies.length === 0 ? (
          <option>No hay compañías disponibles</option>
        ) : (
          companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.name}
            </option>
          ))
        )}
      </select>
    </div>
  </div>
);

export default CompanyDropdown;
