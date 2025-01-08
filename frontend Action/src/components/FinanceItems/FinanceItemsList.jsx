import React from 'react';
import PropTypes from 'prop-types';
import FinanceItemCard from './FinanceItemCard';

const FinanceItemsList = ({ items, onEdit, onDelete }) => (
  <div
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    role="list"
    aria-label="Lista de Ítems Financieros"
  >
    {items.length > 0 ? (
      items.map((item) => (
        <div
          key={item._id}
          role="listitem"
          aria-labelledby={`finance-item-${item._id}`}
          className="animate-fade-in"
        >
          <FinanceItemCard
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ))
    ) : (
      <div
        className="col-span-full text-center text-gray-500 bg-white py-8 rounded-lg shadow-md"
        role="alert"
        aria-live="polite"
      >
        <p className="text-lg font-medium">No hay ítems financieros disponibles</p>
        <p className="text-sm mt-2">Agrega un nuevo ítem financiero para comenzar.</p>
      </div>
    )}
  </div>
);

FinanceItemsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default FinanceItemsList;
