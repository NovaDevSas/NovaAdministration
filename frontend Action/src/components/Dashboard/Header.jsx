import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const Header = () => (
  <header className="bg-white p-6 rounded-lg shadow-md mb-6 flex justify-center items-center">
    {/* Título principal y navegación centrada */}
    <div className="flex items-center space-x-6">
      <h1 className="text-2xl font-bold text-purple-700">Dashboard Nova plus</h1>

      <Link
        to="/home"
        className="text-gray-700 hover:text-purple-700 transition-colors flex items-center space-x-2"
      >
        <FaHome />
        <span>Inicio</span>
      </Link>
    </div>
  </header>
);

export default Header;
