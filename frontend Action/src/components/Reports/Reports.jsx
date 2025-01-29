import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Mosaic/Card';
import ProjectsIcon from '../../assets/icons/ProjectsIcon';
import TasksIcon from '../../assets/icons/TasksIcon';
import FinanceIcon from '../../assets/icons/FinanceIcon';
import FilesIcon from '../../assets/icons/FilesIcon';

const Reports = () => {
  const navigate = useNavigate();

  const reports = [
    {
      name: 'Projects',
      description: 'View project reports',
      path: '/reports/projects',
      color: '#1E90FF', // Azul
      IconComponent: ProjectsIcon,
    },
    {
      name: 'Tasks',
      description: 'View task reports',
      path: '/reports/tasks',
      color: '#32CD32', // Verde
      IconComponent: TasksIcon,
    },
    {
      name: 'Finance',
      description: 'View finance reports',
      path: '/reports/finance',
      color: '#FFA500', // Naranja
      IconComponent: FinanceIcon,
    },
    {
      name: 'Files',
      description: 'View file reports',
      path: '/reports/files',
      color: '#FF6347', // Rojo
      IconComponent: FilesIcon,
    },
  ];

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

      <header className="text-center mb-12 z-20">
        <h1 className="text-5xl font-bold text-purple-700">Reports</h1>
        <p className="text-gray-600 mt-4 text-2xl">Navigate to the desired report</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8 z-20">
        {reports.map((report) => (
          <Card
            key={report.name}
            title={report.name}
            description={report.description}
            IconComponent={report.IconComponent}
            color={report.color}
            onClick={() => navigate(report.path)}
            className="shadow-2xl rounded-xl bg-gradient-to-b from-white to-gray-100 p-10 hover:from-gray-200 hover:to-white text-lg transition-all duration-300 transform hover:scale-105"
          />
        ))}
      </div>
    </div>
  );
};

export default Reports;