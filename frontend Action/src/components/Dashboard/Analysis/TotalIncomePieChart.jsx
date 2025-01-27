import React from 'react';
import { Pie } from 'react-chartjs-2';

const TotalIncomePieChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-semibold mb-2 text-center text-purple-600">
        Ingresos Totales por Empresa
      </h2>
      <p className="text-sm text-gray-600 mb-4 text-center">
        Distribución de ingresos totales entre las empresas
      </p>
      <div className="flex justify-center items-center h-80">
        <Pie
          data={{
            ...data,
            datasets: data.datasets.map((dataset) => ({
              ...dataset,
              backgroundColor: [
                '#4CAF50', // Verde
                '#36A2EB', // Azul
                '#FF6384', // Rojo
                '#FFCE56', // Amarillo
                '#9966FF', // Morado
              ],
              hoverBackgroundColor: [
                '#388E3C', // Verde más oscuro
                '#0288D1', // Azul más oscuro
                '#D32F2F', // Rojo más oscuro
                '#FBC02D', // Amarillo más oscuro
                '#7B1FA2', // Morado más oscuro
              ],
            })),
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                backgroundColor: '#FFF',
                titleColor: '#333',
                bodyColor: '#666',
                borderColor: '#ddd',
                borderWidth: 1,
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 12 },
                callbacks: {
                  label: function (context) {
                    const value = context.raw.toLocaleString();
                    const percentage = (
                      (context.raw /
                        context.dataset.data.reduce((a, b) => a + b, 0)) *
                      100
                    ).toFixed(2);
                    return `${context.label}: $${value} (${percentage}%)`;
                  },
                },
              },
              legend: {
                position: 'bottom',
                labels: {
                  font: { size: 12 },
                  padding: 15,
                  boxWidth: 20,
                },
              },
              datalabels: {
                display: true,
                color: '#333',
                font: { weight: 'bold', size: 16 },
                formatter: (value) => `$${value.toLocaleString()}`,
                backgroundColor: '#FFF',
                borderRadius: 4,
                borderColor: '#CCC',
                borderWidth: 1,
                padding: 8,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default TotalIncomePieChart;