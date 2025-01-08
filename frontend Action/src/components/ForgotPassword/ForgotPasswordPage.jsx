import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!email) {
      setError('Por favor, ingrese su correo electrónico.');
      return;
    }
    try {
      await axios.post(`${BASE_URL}/auth/reset-password`, { email });
      setMessage('Enlace para restablecer la contraseña enviado a su correo electrónico.');
    } catch (error) {
      setError(error.response?.data?.message || 'Ocurrió un error.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 to-indigo-900">
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        <form onSubmit={handleResetPassword}>
          <h2 className="text-3xl font-bold mb-6 text-white">Restablecer Contraseña</h2>
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded bg-transparent text-white placeholder-gray-400"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition">Restablecer Contraseña</button>
          <p className="mt-4 text-center text-white">
            <button type="button" onClick={() => navigate('/login')} className="text-blue-300 hover:underline" rel="noopener noreferrer">Volver al inicio de sesión</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;