import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const ConfirmDeleteModal = ({ confirmDelete, setConfirmDelete, handleDeleteCompany }) => {
  const cancelButtonRef = useRef(null);

  // Enfocar el botón "Cancelar" al abrir el modal
  useEffect(() => {
    if (cancelButtonRef.current) {
      cancelButtonRef.current.focus();
    }
  }, []);

  // Cerrar modal con la tecla "Escape"
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setConfirmDelete(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setConfirmDelete]);

  // Validar antes de eliminar
  const handleDelete = () => {
    if (confirmDelete && confirmDelete._id) {
      handleDeleteCompany(confirmDelete._id);
      setConfirmDelete(null);
    } else {
      console.error('Error: No valid company selected for deletion.');
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
      role="dialog"
    >
      <div className="bg-white p-6 rounded-lg shadow-2xl max-w-md w-full transform transition-transform duration-300 scale-95 hover:scale-100">
        <h2 id="delete-modal-title" className="text-xl font-bold text-gray-900 mb-4">
          Confirmar Eliminación
        </h2>
        <p id="delete-modal-description" className="text-sm text-gray-700 mb-6">
          ¿Estás seguro de que deseas eliminar la empresa <strong>"{confirmDelete.name}"</strong>? Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            ref={cancelButtonRef}
            onClick={() => setConfirmDelete(null)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg shadow hover:bg-gray-200 transition duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
            aria-label="Cancelar eliminación"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
  handleDeleteCompany: PropTypes.func.isRequired,
};

export default ConfirmDeleteModal;
