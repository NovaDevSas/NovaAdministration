import React from 'react';

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md mx-4 text-center">
        <h2 className="text-2xl font-extrabold text-white mb-4">Confirmación</h2>
        <p className="text-white mb-6">{message}</p>
        <div className="flex justify-around">
          <button
            onClick={onCancel}
            className="bg-gray-600 text-white py-2 px-4 rounded-full hover:bg-gray-700 transition duration-300 transform hover:scale-105"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 transition duration-300 transform hover:scale-105"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;