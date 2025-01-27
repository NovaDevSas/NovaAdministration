import React from 'react';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Registrar el plugin
import { Chart as ChartJS } from 'chart.js';
ChartJS.register(ChartDataLabels);

const CircularChart = ({ chartData, loading }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg flex justify-center items-center">
    {loading ? (
      <div className="flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
        <p className="mt-4 text-gray-600 text-sm">Cargando datos...</p>
      </div>
    ) : chartData.labels.length > 0 ? (
      <div className="w-full h-full max-w-[400px] max-h-[400px]">
        <Pie
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  font: {
                    size: 14,
                  },
                  padding: 15,
                  color: '#4B5563', // Gris oscuro para mejor contraste
                },
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) =>
                    `${tooltipItem.label}: $${tooltipItem.raw.toLocaleString()}`,
                },
                backgroundColor: '#1F2937', // Fondo oscuro
                titleFont: {
                  size: 14,
                  weight: 'bold',
                },
                bodyFont: {
                  size: 12,
                },
              },
              datalabels: {
                display: true,
                color: '#000',
                backgroundColor: (context) =>
                  context.dataset.backgroundColor[context.dataIndex],
                borderRadius: 5,
                font: {
                  weight: 'bold',
                  size: 12,
                },
                padding: 8,
                formatter: (value) => `$${value.toLocaleString()}`,
              },
            },
          }}
        />
      </div>
    ) : (
      <div className="text-gray-600 text-center">
        <p>No hay datos disponibles</p>
      </div>
    )}
  </div>
);

export default CircularChart;
