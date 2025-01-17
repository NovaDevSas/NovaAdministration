import React from 'react';

const EditableTable = ({ editingData, handleEditChange, currentPage, itemsPerPage, handlePageChange }) => {
  const currentItems = editingData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(editingData.length / itemsPerPage);

  const formatNumber = (number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Proyección de prueba por proyecto</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border border-gray-300 text-left font-medium text-gray-600">Proyecto</th>
              <th className="p-3 border border-gray-300 text-left font-medium text-gray-600">Ingresos</th>
              <th className="p-3 border border-gray-300 text-left font-medium text-gray-600">Gastos</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((project, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="p-3 border border-gray-300 text-gray-700">{project.name}</td>
                <td className="p-3 border border-gray-300">
                  <input
                    type="number"
                    min="0"
                    value={project.totalIncome}
                    onChange={(e) => handleEditChange(index, 'totalIncome', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-300"
                  />
                  <div className="text-sm text-gray-500 mt-1">{formatNumber(project.totalIncome)}</div>
                </td>
                <td className="p-3 border border-gray-300">
                  <input
                    type="number"
                    min="0"
                    value={project.totalExpense}
                    onChange={(e) => handleEditChange(index, 'totalExpense', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-300"
                  />
                  <div className="text-sm text-gray-500 mt-1">{formatNumber(project.totalExpense)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={`px-3 py-1 rounded-full transition ${
              index === currentPage
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EditableTable;
