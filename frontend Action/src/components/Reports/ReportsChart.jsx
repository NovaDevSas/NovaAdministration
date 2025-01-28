import React from 'react';
import { Bar } from 'react-chartjs-2';

const ReportsChart = ({ data }) => {
  const chartData = {
    labels: data.projects.map(project => project.name),
    datasets: [
      {
        label: 'Ingresos',
        data: data.financeItems.filter(item => item.type === 'income').map(item => item.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Gastos',
        data: data.financeItems.filter(item => item.type === 'expense').map(item => item.amount),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Gráfico</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default ReportsChart;