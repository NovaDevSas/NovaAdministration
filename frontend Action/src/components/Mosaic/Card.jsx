// filepath: src/components/Mosaic/Card.jsx
import React from 'react';

const Card = ({ title, description, IconComponent, color, onClick, className }) => {
  return (
    <div
      className={`group p-6 rounded-lg shadow-md bg-white text-gray-800 cursor-pointer transition-all transform hover:scale-105 hover:shadow-lg ${className}`}
      onClick={onClick}
      style={{
        borderLeft: `6px solid ${color}`, // Coloca una barra de color distintiva en el lateral
      }}
    >
      <div className="flex items-center justify-center mb-4 bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto">
        <IconComponent size={32} color={color} />
      </div>
      <h2 className="text-lg font-semibold text-center">{title}</h2>
      <p className="text-sm text-gray-600 text-center mt-2">{description}</p>
    </div>
  );
};

export default Card;
