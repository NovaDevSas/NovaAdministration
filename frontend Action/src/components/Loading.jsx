import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-900 h-32 w-32"></div>
        </div>
        <h2 className="text-white text-xl font-semibold">Cargando...</h2>
        <p className="text-gray-300">Por favor, espera un momento.</p>
      </div>
    </div>
  );
};

export default Loading;