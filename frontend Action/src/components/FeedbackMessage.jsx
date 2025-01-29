import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const FeedbackMessage = ({ type, message, onClose }) => {
  const [progress, setProgress] = useState(100);

  const getStyles = () => {
    switch (type) {
      case 'error':
        return { borderColor: 'border-red-600', textColor: 'text-red-600', bgColor: 'bg-red-600' };
      case 'info':
        return { borderColor: 'border-blue-600', textColor: 'text-blue-600', bgColor: 'bg-blue-600' };
      case 'success':
        return { borderColor: 'border-green-600', textColor: 'text-green-600', bgColor: 'bg-green-600' };
      case 'alert':
        return { borderColor: 'border-yellow-600', textColor: 'text-yellow-600', bgColor: 'bg-yellow-600' };
      default:
        return { borderColor: 'border-gray-600', textColor: 'text-gray-600', bgColor: 'bg-gray-600' };
    }
  };

  const { borderColor, textColor, bgColor } = getStyles();

  useEffect(() => {
    const timer = setTimeout(onClose, 8000);
    const progressTimer = setInterval(() => {
      setProgress((prev) => (prev > 0 ? prev - 1 : 0));
    }, 80);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, [onClose]);

  const getMessage = () => {
    if (message.includes("400")) {
      return "Revisa la información proporcionada";
    } else if (message.includes("200")) {
      return "Solicitud exitosa";
    }
    return message;
  };

  return (
    <div className="fixed top-4 right-4 z-50 w-full max-w-xs md:max-w-md">
      <div className={`flex flex-col p-4 border-l-4 rounded-lg bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg shadow-md ${borderColor}`}>
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-start">
            <h2 className={`font-semibold ${textColor} text-lg`}>
              {type === "error" ? "Error" : type === "info" ? "Información" : type === "success" ? "Éxito" : "Alerta"}
            </h2>
            <p className="text-gray-300 text-sm">{getMessage()}</p>
          </div>
          <button onClick={onClose} className="ml-4 text-gray-500 hover:text-gray-800">
            <FaTimes className="text-lg" />
          </button>
        </div>
        {/* Barra de progreso */}
        <div className="relative w-full h-1 mt-4 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`absolute top-0 left-0 h-full ${bgColor}`}
            style={{ width: `${progress}%`, transition: 'width 0.08s linear' }} // Barra dinámica
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackMessage;