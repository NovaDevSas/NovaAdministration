import React, { useState } from 'react';
import PropTypes from 'prop-types';

const FinanceItemForm = ({
  financeItem = {},
  onChange,
  onSave,
  onCancel,
  isEditing,
}) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!financeItem.name) newErrors.name = 'El nombre es obligatorio.';
    if (!financeItem.type) newErrors.type = 'El tipo es obligatorio.';
    if (!financeItem.projectId) newErrors.projectId = 'El ID del proyecto es obligatorio.';
    if (!financeItem.frequency) newErrors.frequency = 'La frecuencia es obligatoria.';
    if (!financeItem.amount || financeItem.amount <= 0) newErrors.amount = 'El monto debe ser mayor a cero.';
    if (!financeItem.date || new Date(financeItem.date) < new Date()) newErrors.date = 'La fecha debe ser hoy o una fecha futura.';
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    onSave();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = ['amount', 'discounts', 'costs', 'income'].includes(name) ? parseFloat(value) : value;
    onChange({ target: { name, value: parsedValue } });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gradient-to-b from-white to-gray-50 p-6 rounded-lg shadow-2xl max-w-lg w-full transform transition-transform duration-300 scale-95 hover:scale-100">
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
          {isEditing ? 'Actualizar Ítem Financiero' : 'Crear Nuevo Ítem Financiero'}
        </h2>
        {Object.keys(errors).length > 0 && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded-lg" aria-live="assertive">
            {Object.values(errors).map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-3"
        >
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Nombre del Ítem *"
              value={financeItem.name || ''}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Nombre del Ítem"
            />
            <select
              name="type"
              value={financeItem.type || 'expense'}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Tipo"
            >
              <option value="expense">Gasto</option>
              <option value="income">Ingreso</option>
            </select>
            <select
              name="frequency"
              value={financeItem.frequency || 'one-time'}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Frecuencia"
            >
              <option value="one-time">Único</option>
              <option value="monthly">Mensual</option>
              <option value="quarterly">Trimestral</option>
              <option value="yearly">Anual</option>
            </select>
            <input
              type="number"
              name="amount"
              placeholder="Monto *"
              value={financeItem.amount || ''}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Monto"
            />
            <input
              type="number"
              name="discounts"
              placeholder="Descuentos"
              value={financeItem.discounts || ''}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Descuentos"
            />
            <input
              type="number"
              name="costs"
              placeholder="Costos"
              value={financeItem.costs || ''}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Costos"
            />
            <input
              type="number"
              name="income"
              placeholder="Ingresos"
              value={financeItem.income || ''}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Ingresos"
            />
            <textarea
              name="description"
              placeholder="Descripción (Opcional)"
              value={financeItem.description || ''}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Descripción"
            />
            <input
              type="date"
              name="date"
              placeholder="Fecha *"
              value={financeItem.date || ''}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Fecha"
            />
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label="Cancelar"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              aria-label="Guardar"
            >
              {isEditing ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

FinanceItemForm.propTypes = {
  financeItem: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    projectId: PropTypes.string,
    frequency: PropTypes.string,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    date: PropTypes.string,
    discounts: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    costs: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    income: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default FinanceItemForm;