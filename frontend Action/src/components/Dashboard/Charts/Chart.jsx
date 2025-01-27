import React from 'react';
import { Bar } from 'react-chartjs-2';

const Chart = ({ chartData, filters }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-6">
    {/* Resumen */}
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="flex flex-col items-center">
        <div className="text-green-600 text-3xl font-bold">
          ${chartData.datasets[0]?.data.reduce((a, b) => a + b, 0).toLocaleString()}
        </div>
        <div className="text-gray-600 text-sm flex items-center">
          <span className="mr-2">💰</span> Total Ingresos
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-red-600 text-3xl font-bold">
          ${chartData.datasets[1]?.data.reduce((a, b) => a + b, 0).toLocaleString()}
        </div>
        <div className="text-gray-600 text-sm flex items-center">
          <span className="mr-2">⚠️</span> Total Gastos
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div
          className={`text-3xl font-bold ${
            chartData.datasets[0]?.data.reduce((a, b) => a + b, 0) -
              chartData.datasets[1]?.data.reduce((a, b) => a + b, 0) >
            0
              ? 'text-blue-600'
              : 'text-red-600'
          }`}
        >
          ${(
            chartData.datasets[0]?.data.reduce((a, b) => a + b, 0) -
            chartData.datasets[1]?.data.reduce((a, b) => a + b, 0)
          ).toLocaleString()}
        </div>
        <div className="text-gray-600 text-sm flex items-center">
          <span className="mr-2">📊</span> Balance Total
        </div>
      </div>
    </div>

    {/* Gráfico */}
    <div className="h-72">
      <Bar
        data={{
          ...chartData,
          datasets: chartData.datasets.filter((_, index) =>
            index === 0 ? filters.showIncome : filters.showExpense
          ).map((dataset) => ({
            ...dataset,
            barThickness: 15, // Ajuste del grosor de las barras
          })),
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                font: { size: 12 },
                boxWidth: 12,
              },
            },
            tooltip: {
              callbacks: {
                title: (tooltipItems) => `Proyecto: ${tooltipItems[0].label}`,
                label: (tooltipItem) =>
                  `${tooltipItem.dataset.label}: $${tooltipItem.raw.toLocaleString()}`,
              },
            },
          },
          scales: {
            x: {
              ticks: {
                font: { size: 10 },
                autoSkip: false,
                maxRotation: 45,
                minRotation: 0,
              },
              title: {
                display: true,
                text: 'Proyectos',
                font: { size: 14, weight: 'bold' },
              },
            },
            y: {
              ticks: {
                callback: (value) => `$${value.toLocaleString()}`,
                font: { size: 12 },
              },
              title: {
                display: true,
                text: 'Monto (USD)',
                font: { size: 14, weight: 'bold' },
              },
              grid: { borderDash: [5, 5] }, // Líneas discontinuas
            },
          },
        }}
      />
    </div>
  </div>
);

export default Chart;
