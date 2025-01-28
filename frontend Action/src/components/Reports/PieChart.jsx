import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data }) => {
  const chartData = {
    labels: ['Ingresos', 'Gastos'],
    datasets: [
      {
        data: [
          data.financeItems.filter(item => item.type === 'income').reduce((acc, item) => acc + item.amount, 0),
          data.financeItems.filter(item => item.type === 'expense').reduce((acc, item) => acc + item.amount, 0),
        ],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Gráfico Circular</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;