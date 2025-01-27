import React from 'react';
import { Bar } from 'react-chartjs-2';

const TopIncomes = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-center">Top 5 Ingresos</h2>
      <div className="h-64">
        <Bar
          data={{
            labels: data.map(company => company.company.name),
            datasets: [
              {
                label: 'Ingresos',
                data: data.map(company => company.totalIncome),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
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

export default TopIncomes;