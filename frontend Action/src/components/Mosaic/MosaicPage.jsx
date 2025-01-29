import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import DashboardIcon from '../../assets/icons/DashboardIcon';
import ReportsIcon from '../../assets/icons/ReportsIcon';
import CompanyIcon from '../../assets/icons/CompanyIcon';
import ProjectsIcon from '../../assets/icons/ProjectsIcon';
import { FaSignOutAlt } from 'react-icons/fa';

const MosaicPage = () => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  const applications = [
    {
      name: 'Dashboard',
      description: 'Ver tu tablero',
      path: '/dashboard',
      color: '#FF6347',
      IconComponent: DashboardIcon,
    },
    {
      name: 'Reportes',
      description: 'Genera Reportes',
      path: '/reports',
      color: '#32CD32',
      IconComponent: ReportsIcon,
    },
    {
      name: 'Compañías',
      description: 'Revisa tus compañias',
      path: '/companies',
      color: '#1E90FF',
      IconComponent: CompanyIcon,
    },{
      name: 'Tareas',
      description: 'Gestión de proyectos',
      path: '/Tasks',
      color: '#FFA500',
      IconComponent: ProjectsIcon,
    },
  ];

  const handleImageClick = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token de autenticación
    navigate('/login'); // Redirigir a la página de inicio de sesión
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center bg-white">
      {/* Fondo con curvas naturales */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(198, 239, 206, 0.8)"
            d="M0,64L48,96C96,128,192,192,288,213.3C384,235,480,213,576,176C672,139,768,85,864,69.3C960,53,1056,75,1152,112C1248,149,1344,203,1392,229.3L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            style={{ filter: 'blur(2px)' }}
          ></path>
          <path
            fill="rgba(245, 239, 223, 0.7)"
            d="M0,256L60,234.7C120,213,240,171,360,144C480,117,600,107,720,112C840,117,960,139,1080,181.3C1200,224,1320,288,1380,320L1440,352L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            style={{ filter: 'blur(3px)' }}
          ></path>
        </svg>
      </div>

      {/* Botón de Cerrar Sesión */}
      <button
  onClick={handleLogout}
  className="absolute top-4 right-4 bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:bg-red-600 transition duration-300 focus:ring-2 focus:ring-red-400 z-20"
  title="Cerrar Sesión"
  aria-label="Cerrar Sesión"
>
  <FaSignOutAlt className="w-5 h-5" />
</button>


      {/* Imagen del Nova Pet */}
      <div
        className="absolute bottom-12 right-12 w-32 h-32 bg-gradient-to-b from-purple-100 to-transparent rounded-full shadow-md flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 z-20"
        onClick={handleImageClick}
      >
        <img
          src="/images/pet.png"
          alt="Nova Pet"
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>

      {/* Mensaje emergente */}
      {showMessage && (
        <div className="absolute bottom-44 right-16 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-center animate-fade-in z-20">
          <p className="text-gray-800 text-sm">
            ¿Necesitas ayuda?{' '}
            <a
              href="https://novadevsas.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Contacta aquí
            </a>
          </p>
        </div>
      )}

      {/* Título y subtítulo */}
      <header className="text-center mb-12 z-20">
        <h1 className="text-5xl font-bold text-purple-700">Bienvenido a Nova</h1>
        <p className="text-gray-600 mt-4 text-2xl">
          Navega a la configuración deseada
        </p>
      </header>

      {/* Tarjetas individuales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8 z-20">
        {applications.map((app) => (
          <Card
            key={app.name}
            title={app.name}
            description={app.description}
            IconComponent={app.IconComponent}
            color={app.color}
            onClick={() => navigate(app.path)}
            className="shadow-2xl rounded-xl bg-gradient-to-b from-white to-gray-100 p-10 hover:from-gray-200 hover:to-white text-lg transition-all duration-300 transform hover:scale-105"
          />
        ))}
      </div>
    </div>
  );
};

export default MosaicPage;
