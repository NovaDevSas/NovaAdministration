import React from 'react';

const EditableTable = ({ editingData, handleEditChange, currentPage, itemsPerPage, handlePageChange }) => {
  const currentItems = editingData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(editingData.length / itemsPerPage);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Tabla de Proyectos</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border border-gray-300">Proyecto</th>
            <th className="p-2 border border-gray-300">Ingresos</th>
            <th className="p-2 border border-gray-300">Gastos</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((project, index) => (
            <tr key={index}>
              <td className="p-2 border border-gray-300">{project.name}</td>
              <td className="p-2 border border-gray-300">
                <input
                  type="number"
                  value={project.totalIncome}
                  onChange={(e) => handleEditChange(index, 'totalIncome', e.target.value)}
                  className="w-full border border-gray-300 p-1 rounded"
                />
              </td>
              <td className="p-2 border border-gray-300">
                <input
                  type="number"
                  value={project.totalExpense}
                  onChange={(e) => handleEditChange(index, 'totalExpense', e.target.value)}
                  className="w-full border border-gray-300 p-1 rounded"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={`px-3 py-1 rounded ${index === currentPage ? 'bg-purple-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EditableTable;