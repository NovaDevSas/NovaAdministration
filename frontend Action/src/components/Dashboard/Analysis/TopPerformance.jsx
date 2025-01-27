import React from 'react';
import { Bar } from 'react-chartjs-2';

const TopPerformance = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-center">Top 5 Rendimiento</h2>
      <div className="h-64">
        <Bar
          data={{
            labels: data.map(company => company.company.name),
            datasets: [
              {
                label: 'Rendimiento',
                data: data.map(company => company.totalIncome - company.totalExpenses),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
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

export default TopPerformance;