import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Card from "../Mosaic/Card";
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
      name: "Tasks",
      description: "View task reports",
      path: "/tasks",
      color: "#32CD32", // Verde
      IconComponent: TasksIcon,
    },
    {
      name: "Finance",
      description: "View finance reports",
      path: "/finance-items",
      color: "#FFA500", // Naranja
      IconComponent: FinanceIcon,
    },
    {
      name: "Projects",
      description: "View project reports",
      path: "/projects",
      color: "#1E90FF", // Azul
      IconComponent: ProjectsIcon,
    },
    {
      name: "Companies",
      description: "View company reports",
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
        <h1 className="text-5xl font-bold text-purple-700">Reports</h1>
        <p className="text-gray-600 mt-4 text-xl">
          Navigate to the desired report
        </p>
      </header>

      {/* Contenedor de Cards */}
      <div className="grid grid-cols-2 gap-6 z-20">
        {reports.map((report) => (
          <div key={report.name} className="relative">
            <Card
              title={report.name}
              description={report.description}
              IconComponent={report.IconComponent}
              color={report.color}
              onClick={() => navigate(`/reports${report.path}`)}
              className="flex flex-col items-center justify-center shadow-lg rounded-xl bg-gradient-to-b from-white to-gray-100 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300"
            />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between space-x-2">
              <button
                onClick={() => downloadPDF(report.path)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
              >
                Download PDF
              </button>
              <button
                onClick={() => downloadExcel(report.path)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
              >
                Download Excel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;