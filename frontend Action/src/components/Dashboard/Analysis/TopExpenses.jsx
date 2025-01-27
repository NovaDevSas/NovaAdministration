import React from 'react';
import { Bar } from 'react-chartjs-2';

const TopExpenses = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-center">Top 5 Gastos</h2>
      <div className="h-64">
        <Bar
          data={{
            labels: data.map(company => company.company.name),
            datasets: [
              {
                label: 'Gastos',
                data: data.map(company => company.totalExpenses),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                ticks: {
                  maxRotation: 90,
                  minRotation: 45,
                },
              },
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default TopExpenses;