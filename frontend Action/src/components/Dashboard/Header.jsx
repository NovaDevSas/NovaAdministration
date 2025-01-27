import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const Header = () => (
  <header className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 p-6 rounded-lg shadow-md mb-6 flex justify-between items-center">
    {/* Título principal */}
    <div className="flex items-center space-x-4">
      <h1 className="text-3xl font-bold text-purple-800 tracking-wide">
        Dashboard Nova Plus
      </h1>
    </div>

    {/* Navegación */}
    <nav className="flex items-center space-x-6">
      <Link
        to="/home"
        className="text-gray-700 hover:text-purple-800 transition-colors flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow hover:shadow-md hover:bg-purple-100"
      >
        <FaHome size={20} />
        <span className="text-sm font-semibold">Inicio</span>
      </Link>
    </nav>
  </header>
);

export default Header;
