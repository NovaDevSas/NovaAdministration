import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FaExclamationTriangle } from 'react-icons/fa';

const ConfirmDeleteModal = ({ confirmDelete, setConfirmDelete, handleDeleteProject }) => {
  const cancelButtonRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Enfocar el botón "Cancelar" al abrir el modal
  useEffect(() => {
    if (cancelButtonRef.current) {
      cancelButtonRef.current.focus();
    }
  }, []);

  const handleConfirm = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      await handleDeleteProject();
    } catch (error) {
      console.error('Error al eliminar el proyecto:', error);
    } finally {
      setIsProcessing(false);
      setConfirmDelete(null);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300"
      role="alertdialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      aria-live={isProcessing ? "assertive" : "polite"}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full animate-fade-in"
        style={{ animation: 'fadeIn 0.3s ease-out' }}
      >
        <div className="flex justify-center items-center text-red-500 mb-4">
          <FaExclamationTriangle className="text-4xl" />
        </div>
        <h2
          id="modal-title"
          className="text-xl font-bold mb-4 text-gray-800"
        >
          ¿Estás seguro de eliminar el proyecto{' '}
          <span className="text-red-500">{confirmDelete.name}</span>?
        </h2>
        <p
          id="modal-description"
          className="text-sm text-gray-600 mb-6"
        >
          Esta acción no se puede deshacer y eliminará todos los datos relacionados.
        </p>
        <div className="flex justify-center gap-4">
          <button
            ref={cancelButtonRef}
            onClick={() => setConfirmDelete(null)}
            disabled={isProcessing}
            className="px-4 py-2 bg-gray-300 rounded-lg text-gray-700 hover:bg-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={isProcessing}
            className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                Procesando...
              </>
            ) : (
              'Confirmar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmDeleteModal.propTypes = {
  confirmDelete: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  setConfirmDelete: PropTypes.func.isRequired,
  handleDeleteProject: PropTypes.func.isRequired,
};

export default ConfirmDeleteModal;
