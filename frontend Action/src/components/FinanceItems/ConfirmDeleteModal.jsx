import React from 'react';
import PropTypes from 'prop-types';

const ConfirmDeleteModal = ({ confirmDelete, setConfirmDelete, handleDeleteItem }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-delete-title"
      aria-describedby="confirm-delete-description"
    >
      <div className="bg-white p-6 rounded-lg shadow-2xl max-w-md w-full transform transition-transform duration-300 ease-in-out scale-95 hover:scale-100">
        {/* Título del Modal */}
        <h2
          id="confirm-delete-title"
          className="text-2xl font-bold text-gray-800 mb-4 text-center"
        >
          Confirmar Eliminación
        </h2>

        {/* Descripción */}
        <p
          id="confirm-delete-description"
          className="text-gray-600 mb-6 text-center"
        >
          ¿Estás seguro de que deseas eliminar el ítem financiero{" "}
          <span className="font-semibold text-gray-800">{confirmDelete.name}</span>?
        </p>

        {/* Botones */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setConfirmDelete(null)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Cancelar eliminación"
          >
            Cancelar
          </button>
          <button
            onClick={handleDeleteItem}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            aria-label="Confirmar eliminación"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmDeleteModal.propTypes = {
  confirmDelete: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  setConfirmDelete: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
};

export default ConfirmDeleteModal;
