import React from 'react';

const ReportsTable = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Tabla de Datos</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Nombre del Proyecto</th>
            <th className="py-2">Empresa</th>
            <th className="py-2">Ingresos</th>
            <th className="py-2">Gastos</th>
          </tr>
        </thead>
        <tbody>
          {data.projects.map((project) => (
            <tr key={project._id}>
              <td className="py-2">{project.name}</td>
              <td className="py-2">{data.companies.find(company => company._id === project.companyId)?.name}</td>
              <td className="py-2">
                {data.financeItems
                  .filter(item => item.projectId === project._id && item.type === 'income')
                  .reduce((acc, item) => acc + item.amount, 0)}
              </td>
              <td className="py-2">
                {data.financeItems
                  .filter(item => item.projectId === project._id && item.type === 'expense')
                  .reduce((acc, item) => acc + item.amount, 0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable;