import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Header from './Header';
import Chart from './Chart';
import EditableTable from './EditableTable';
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

  const handleEditChange = (index, field, value) => {
    const updatedData = [...editingData];
    updatedData[index][field] = parseInt(value, 10) || 0; // Validar entradas no numéricas
    setEditingData(updatedData);

    const incomeData = updatedData.map((project) => project.totalIncome);
    const expenseData = updatedData.map((project) => project.totalExpense);

    setChartData((prevData) => ({
      ...prevData,
      datasets: [
        { ...prevData.datasets[0], data: incomeData },
        { ...prevData.datasets[1], data: expenseData },
      ],
    }));
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Header />
      {error ? (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg">
          {error}
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
        </div>
      ) : (
        <>
          <Chart chartData={chartData} filters={filters} />
          <EditableTable
            editingData={editingData}
            handleEditChange={handleEditChange}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            handlePageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
