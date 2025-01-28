import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Header from './Header';
import Chart from './Charts/Chart';
import PieChart from './Charts/PieChart';
import FodaAnalysis from './Analysis/FodaAnalysis';
import Tabs from './Tabs';
import 'chart.js/auto';

const Dashboard = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Ingresos',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderRadius: 10,
      },
      {
        label: 'Gastos',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderRadius: 10,
      },
    ],
  });

  const [filters, setFilters] = useState({
    showIncome: true,
    showExpense: true,
  });

  const [editingData, setEditingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/projects/summary');
      const projects = response.data;

      if (Array.isArray(projects)) {
        const labels = projects.map((project) => project.name);
        const incomeData = projects.map((project) => project.totalIncome);
        const expenseData = projects.map((project) => project.totalExpense);

        setChartData((prevData) => ({
          ...prevData,
          labels,
          datasets: [
            { ...prevData.datasets[0], data: incomeData },
            { ...prevData.datasets[1], data: expenseData },
          ],
        }));

        setEditingData(projects);
        setError(null);
      } else {
        throw new Error('Datos no válidos');
      }
    } catch (err) {
      setError('Error al cargar datos del servidor.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const tabs = [
    {
      label: 'Balance de Projectos',
      content: (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <Chart chartData={chartData} filters={filters} />
        </div>
      ),
    },
    {
      label: 'Proyectos',
      content: (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-center">Proyectos</h2>
          <PieChart />
        </div>
      ),
    },
    {
      label: 'Análisis Por Empresas',
      content: (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <FodaAnalysis />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-8">
      <Header />
      {error ? (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg text-center">
          {error}
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
        </div>
      ) : (
        <Tabs tabs={tabs} />
      )}
    </div>
  );
};

export default Dashboard;