import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import FinanceItemDetailsModal from './FinanceItemDetailsModal';

const formatDate = (date) => {
  if (!date) return 'Sin Fecha';
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString('es-ES', options); // Use 'es-ES' to ensure correct date format in Spanish
  return formattedDate;
};

const FinanceItemsList = ({ financeItems = [], onEdit, onDelete }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Mostrar 5 ítems por página

  const totalPages = Math.ceil(financeItems.length / itemsPerPage);

  const handleViewDetails = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const paginateItems = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-md">
      {financeItems.length === 0 ? (
        <div className="flex justify-center items-center h-48 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">
            No se encontraron ítems financieros. <span className="font-semibold">¡Agrega uno para empezar!</span>
          </p>
        </div>
      ) : (
        <>
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="py-3 px-4 text-gray-600 font-semibold">Nombre</th>
                <th className="py-3 px-4 text-gray-600 font-semibold">Tipo</th>
                <th className="py-3 px-4 text-gray-600 font-semibold">Monto</th>
                <th className="py-3 px-4 text-gray-600 font-semibold">Fecha</th>
                <th className="py-3 px-4 text-center text-gray-600 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginateItems(financeItems).map((item, index) => (
                <tr
                  key={item._id}
                  className={`border-b hover:bg-gray-50 transition duration-150 ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <td className="py-3 px-4 truncate font-medium text-gray-800" title={item.name}>
                    {item.name}
                  </td>
                  <td className="py-3 px-4 truncate text-gray-600">{item.type}</td>
                  <td className="py-3 px-4 truncate text-gray-600">${item.amount}</td>
                  <td className="py-3 px-4 truncate text-gray-600">{formatDate(item.date)}</td>
                  <td className="py-3 px-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleViewDetails(item)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 focus:ring-2 focus:ring-blue-400 transition"
                      aria-label={`Ver detalles de: ${item.name}`}
                      title="Ver"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 focus:ring-2 focus:ring-green-400 transition"
                      aria-label={`Editar ítem financiero: ${item.name}`}
                      title="Editar"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 focus:ring-2 focus:ring-red-400 transition"
                      aria-label={`Eliminar ítem financiero: ${item.name}`}
                      title="Eliminar"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
          <div className="flex justify-between items-center mt-4 px-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-purple-500 transition disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="text-gray-600">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-purple-500 transition disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </>
      )}

      {/* Modal para mostrar detalles completos */}
      {selectedItem && (
        <FinanceItemDetailsModal financeItem={selectedItem} onClose={handleCloseModal} />
      )}
    </div>
  );
};

FinanceItemsList.propTypes = {
  financeItems: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      date: PropTypes.string.isRequired,
    })
  ),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default FinanceItemsList;