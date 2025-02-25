import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProjectsIcon from "../../assets/icons/ProjectsIcon";
import TasksIcon from "../../assets/icons/TasksIcon";
import FinanceIcon from "../../assets/icons/FinanceIcon";
import CompaniesIcon from "../../assets/icons/CompaniesIcon";

const Reports = () => {
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const downloadPDF = async (path) => {
    try {
      const response = await axios.get(`${API_BASE_URL}${path}/download/pdf`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${path.split('/').pop()}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  const downloadExcel = async (path) => {
    try {
      const response = await axios.get(`${API_BASE_URL}${path}/download/excel`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${path.split('/').pop()}.xlsx`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading Excel:', error);
    }
  };

  const reports = [
    {
      name: "Tareas",
      description: "Ver reportes de tareas",
      path: "/tasks",
      color: "#32CD32", // Verde
      IconComponent: TasksIcon,
    },
    {
      name: "Finanzas",
      description: "Ver reportes de finanzas",
      path: "/finance-items",
      color: "#FFA500", // Naranja
      IconComponent: FinanceIcon,
    },
    {
      name: "Proyectos",
      description: "Ver reportes de proyectos",
      path: "/projects",
      color: "#1E90FF", // Azul
      IconComponent: ProjectsIcon,
    },
    {
      name: "Clientes",
      description: "Ver reportes de Clientes",
      path: "/companies",
      color: "#FF6347", // Rojo
      IconComponent: CompaniesIcon,
    },
  ];

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col items-center p-8">
      {/* Botón de Volver Innovador */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-6"
          aria-label="Return to Home"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Fondo con imagen ajustada */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(/images/PetGym.png)`,
          backgroundSize: "contain", // Mostrar un solo robot
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.2,
        }}
      ></div>

      {/* Fondo decorativo con curvas */}
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
            style={{ filter: "blur(1px)" }}
          ></path>
        </svg>
      </div>

      {/* Encabezado */}
      <header className="text-center z-20 mb-12">
        <h1 className="text-5xl font-bold text-purple-700">Reportes</h1>
        <p className="text-gray-600 mt-4 text-xl">
          Descarga el reporte deseado
        </p>
      </header>

      {/* Contenedor de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 z-20">
        {reports.map((report) => (
          <div key={report.name} className="relative p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105" style={{ border: `2px solid ${report.color}`, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <div className="flex flex-col items-center justify-center space-y-4">
              <report.IconComponent className="w-16 h-16" style={{ color: report.color }} />
              <h3 className="text-2xl font-bold" style={{ color: report.color }}>{report.name}</h3>
              <p className="text-gray-600">{report.description}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => downloadPDF(report.path)}
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h14M12 5l7 7-7 7"
                    ></path>
                  </svg>
                  <span>PDF</span>
                </button>
                <button
                  onClick={() => downloadExcel(report.path)}
                  className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h14M12 5l7 7-7 7"
                    ></path>
                  </svg>
                  <span>Excel</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;