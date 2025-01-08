import React from 'react';
import PropTypes from 'prop-types';
import CompanyCard from './CompanyCard';

const CompanyList = ({ companies, onEdit, onDelete, onRefresh }) => {
  return (
    <div className="mt-6">
      {companies.length > 0 ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Lista de empresas"
        >
          {companies.map((company, index) => {
            if (!company.status) {
              console.warn(`Empresa con ID: ${company._id} no tiene un campo "status" definido.`);
            }

            return (
              <div
                key={company._id || `company-${index}`}
                className="animate-fade-in"
                aria-labelledby={`company-${company._id || `company-${index}`}`}
                role="listitem"
              >
                <CompanyCard
                  company={company}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className="text-center text-gray-500 bg-white py-8 rounded-lg shadow-md border border-gray-200"
          role="alert"
          aria-live="polite"
        >
          <p className="text-xl font-medium">No hay empresas disponibles</p>
          <p className="text-sm mt-2">
            Puedes añadir una nueva empresa haciendo clic en "Nueva Empresa".
          </p>
          <button
            onClick={onRefresh}
            className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Actualizar lista de empresas"
          >
            Refrescar Lista
          </button>
        </div>
      )}
    </div>
  );
};

CompanyList.propTypes = {
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['activa', 'inactiva']).isRequired, // Validación estricta
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default CompanyList;