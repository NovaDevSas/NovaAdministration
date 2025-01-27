import React from 'react';
import { Pie } from 'react-chartjs-2';

const TotalIncomePieChart = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-center">Ingresos Totales por Empresa</h2>
      <div className="h-64">
        <Pie
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
};

export default TotalIncomePieChart;