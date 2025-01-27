import React from 'react';
import { Bar } from 'react-chartjs-2';

const TopIncomes = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-semibold mb-2 text-center text-blue-600">Top 5 Ingresos</h2>
      <p className="text-sm text-gray-600 mb-4 text-center">
        Empresas con los mayores ingresos registrados
      </p>
      <div className="h-72">
        <Bar
          data={{
            labels: data.map((company) => company.company.name),
            datasets: [
              {
                label: 'Ingresos',
                data: data.map((company) => company.totalIncome),
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
                borderRadius: 5,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                ticks: {
                  font: { size: 12, color: '#FFF' },
                  maxRotation: 45,
                  minRotation: 0,
                },
                grid: {
                  display: false,
                },
              },
              y: {
                ticks: {
                  font: { size: 12, color: '#FFF' },
                  callback: (value) => `$${value.toLocaleString()}`,
                },
                title: {
                  display: true,
                  text: 'Ingresos en USD',
                  font: { size: 14, weight: 'bold', color: '#FFF' },
                },
                grid: {
                  borderDash: [5, 5],
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                backgroundColor: '#333',
                titleFont: { size: 14, weight: 'bold', color: '#FFF' },
                bodyFont: { size: 12, color: '#FFF' },
                callbacks: {
                  label: function (context) {
                    return `Ingresos: $${context.raw.toLocaleString()}`;
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default TopIncomes;