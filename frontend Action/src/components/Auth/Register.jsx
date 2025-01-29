import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import authService from "../../services/authService"; // Corrige la ruta
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import FeedbackMessage from "../FeedbackMessage"; // Corrige la ruta
import Loading from "../Loading"; // Corrige la ruta

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState('');
  const [messageText, setMessageText] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    try {
      // Validar nombre
      if (!name.trim()) {
        throw new Error("Por favor ingresa tu nombre.");
      }
      // Validar correo electrónico
      if (!validateEmail(email)) {
        throw new Error("Por favor ingresa un correo electrónico válido.");
      }
      // Implementar política de contraseñas seguras
      if (password.length < 8 || !/\d/.test(password) || !/[A-Z]/.test(password)) {
        throw new Error("La contraseña debe tener al menos 8 caracteres, incluir un número y una letra mayúscula.");
      }
      await authService.register(name, email, password);
      // Autologin después de un registro exitoso
      await authService.login(email, password);
      // Redirigir al usuario a la página principal o a otra página
      window.location.href = "/home";
    } catch (error) {
      setMessageType('error');
      setMessageText(error.response?.data?.message || error.message || "Error al crear la cuenta");
      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  };

  // Lista de imágenes para el collage
  const backgroundImages = [
    "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/7586239/pexels-photo-7586239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/10767551/pexels-photo-10767551.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/6444855/pexels-photo-6444855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1738641/pexels-photo-1738641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2280551/pexels-photo-2280551.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1797103/pexels-photo-1797103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3912477/pexels-photo-3912477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  const safePositions = [
    { top: "5%", left: "5%" },
    { top: "10%", left: "70%" },
    { top: "20%", left: "20%" },
    { top: "25%", left: "80%" },
    { top: "40%", left: "10%" },
    { top: "45%", left: "70%" },
    { top: "60%", left: "30%" },
    { top: "65%", left: "85%" },
  ];

  return (
    <div className="relative bg-gradient-to-b from-black via-gray-900 to-gray-950 h-screen flex flex-col items-center justify-center text-center px-4">
      {/* Fondo tipo collage */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {backgroundImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Background ${index + 1}`}
            className={`object-cover h-32 w-32 md:h-48 md:w-48 rounded-lg animate-floating ${
              index % 2 === 0 ? "rotate-2" : "-rotate-2"
            }`}
            style={{
              position: "absolute",
              top: safePositions[index]?.top,
              left: safePositions[index]?.left,
              opacity: 0.15, // Ajuste de opacidad
            }}
          />
        ))}
      </div>

      <div className="relative z-20 bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-white mb-6">Crear cuenta</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-6">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Ingresa tu nombre"
            autoComplete="off"
          />
        </div>
        <div className="mb-6">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Ingresa tu correo electrónico"
            autoComplete="off"
          />
        </div>
        <div className="mb-6 relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            className="w-full px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Ingresa tu contraseña"
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 px-4 py-2 text-gray-400 hover:text-gray-200 focus:outline-none"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="mb-6">
          <button
            onClick={handleRegister}
            className="w-full bg-purple-600 text-white py-2 rounded-full hover:bg-purple-700 transition duration-300 transform hover:scale-105"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Crear cuenta"}
          </button>
        </div>
        <p className="text-gray-400 mt-4">
          ¿Ya tienes una cuenta?{" "}
          <button
            onClick={() => navigate('/login')}
            className="text-purple-500 hover:text-purple-700 transition"
          >
            Inicia sesión
          </button>
        </p>
      </div>
      {showMessage && (
        <FeedbackMessage
          type={messageType}
          message={messageText}
          onClose={() => setShowMessage(false)}
        />
      )}
      {loading && <Loading />}
    </div>
  );
};

export default Register;