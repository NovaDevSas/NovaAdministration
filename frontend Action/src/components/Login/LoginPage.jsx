import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, complete todos los campos.');
      return;
    }
    try {
      await axios.post(`${BASE_URL}/auth/login`, { email, password });
      navigate('/home');
    } catch (error) {
      setError(error.response?.data?.message || 'Ocurrió un error.');
      console.error(error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-200 p-8">
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(198, 239, 206, 0.6)"
            d="M0,224L48,213.3C96,203,192,181,288,192C384,203,480,245,576,234.7C672,224,768,160,864,133.3C960,107,1056,117,1152,133.3C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded bg-transparent text-black placeholder-gray-400"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded bg-transparent text-black placeholder-gray-400"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;