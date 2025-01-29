import React, { useState, useEffect } from 'react';
import { FaPowerOff, FaUser } from 'react-icons/fa';
import ConfirmationPopup from './ConfirmationPopup';
import authService from '../services/authService';

const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si hay una sesión activa
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    window.location.href = '/login';
  };

  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-gray-950 text-textPrimary p-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold tracking-wide">
          Tradefy
        </a>
        {/* Icons */}
        {isLoggedIn && (
          <div className="flex items-center space-x-4">
            <button onClick={() => window.location.href = '/profile'} className="text-white hover:text-gray-400 transition">
              <FaUser size={24} />
            </button>
            <button onClick={() => setShowPopup(true)} className="text-white hover:text-gray-400 transition">
              <FaPowerOff size={24} />
            </button>
          </div>
        )}
      </div>
      {showPopup && (
        <ConfirmationPopup
          message="¿Estás seguro de que deseas cerrar sesión?"
          onConfirm={handleLogout}
          onCancel={() => setShowPopup(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;