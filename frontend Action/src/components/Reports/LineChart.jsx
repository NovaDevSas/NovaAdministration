import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data }) => {
  const chartData = {
    labels: data.tasks.map(task => task.date),
    datasets: [
      {
        label: 'Tareas Completadas',
        data: data.tasks.map(task => task.completed ? 1 : 0),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Gráfico de Líneas de Tendencias</h2>
      <Line data={chartData} />
    </div>
  );
};

export default LineChart;