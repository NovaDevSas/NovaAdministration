import React from 'react';
import { Bar } from 'react-chartjs-2';

const TopExpenses = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-2 text-gray-800 text-center">Top 5 Gastos</h2>
      <p className="text-sm text-gray-600 mb-4 text-center">
        Las empresas con los mayores gastos registrados
      </p>
      <div className="h-72 w-full">
        <Bar
          data={{
            labels: data.map((company) => company.company.name),
            datasets: [
              {
                label: 'Gastos',
                data: data.map((company) => company.totalExpenses),
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
                borderRadius: 5, // Bordes redondeados en las barras
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                ticks: {
                  maxRotation: 45,
                  minRotation: 0,
                  font: { size: 12, color: '#FFF' },
                },
                title: {
                  display: true,
                  text: 'Empresas',
                  font: { size: 14, weight: 'bold', color: '#FFF' },
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => `$${value.toLocaleString()}`,
                  font: { size: 12, color: '#FFF' },
                },
                title: {
                  display: true,
                  text: 'Monto (USD)',
                  font: { size: 14, weight: 'bold', color: '#FFF' },
                },
                grid: {
                  borderDash: [5, 5], // Líneas de grilla punteadas
                },
              },
            },
            plugins: {
              legend: {
                display: false, // Oculta la leyenda para no repetir información
              },
              tooltip: {
                backgroundColor: '#333',
                titleFont: { size: 14, weight: 'bold', color: '#FFF' },
                bodyFont: { size: 12, color: '#FFF' },
                callbacks: {
                  label: function (context) {
                    return `Gastos: $${context.raw.toLocaleString()}`;
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

export default TopExpenses;