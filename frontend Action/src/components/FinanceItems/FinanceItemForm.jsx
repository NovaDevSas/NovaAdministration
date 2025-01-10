import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';

const FinanceItemForm = ({
  financeItem = {},
  onChange,
  onSave,
  onCancel,
  isEditing,
}) => {
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [date, setDate] = useState(financeItem.date || '');

  // Sincronizar fecha con el estado local
  useEffect(() => {
    setDate(financeItem.date || '');
  }, [financeItem]);

  const validateForm = () => {
    const newErrors = {};
    if (!financeItem.name) newErrors.name = 'El nombre es obligatorio.';
    if (!financeItem.type) newErrors.type = 'El tipo es obligatorio.';
    if (!financeItem.amount || financeItem.amount <= 0) newErrors.amount = 'El monto debe ser mayor a cero.';
    if (!date) newErrors.date = 'La fecha es obligatoria.';
    if (new Date(date) < new Date()) newErrors.date = 'La fecha debe ser hoy o una fecha futura.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSaving(true);
    await onSave();
    setIsSaving(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ target: { name, value } });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
          {isEditing ? 'Actualizar Ítem Financiero' : 'Crear Nuevo Ítem Financiero'}
        </h2>

        {/* Mensajes de error */}
        {Object.keys(errors).length > 0 && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded-lg" aria-live="assertive">
            {Object.values(errors).map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-3">
          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-1">Nombre del Ítem</label>
            <input
              type="text"
              name="name"
              id="name"
              value={financeItem.name || ''}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={!!errors.name}
            />
          </div>

          {/* Tipo */}
          <div>
            <label htmlFor="type" className="block text-gray-700 mb-1">Tipo</label>
            <select
              name="type"
              id="type"
              value={financeItem.type || 'expense'}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="expense">Gasto</option>
              <option value="income">Ingreso</option>
            </select>
          </div>

          {/* Monto */}
          <div>
            <label htmlFor="amount" className="block text-gray-700 mb-1">Monto</label>
            <NumericFormat
              name="amount"
              id="amount"
              value={financeItem.amount || ''}
              onValueChange={(values) => onChange({ target: { name: 'amount', value: values.value } })}
              thousandSeparator
              prefix="$"
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                errors.amount ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={!!errors.amount}
            />
          </div>

          {/* Costos */}
          <div>
            <label htmlFor="costs" className="block text-gray-700 mb-1">Costos</label>
            <NumericFormat
              name="costs"
              id="costs"
              value={financeItem.costs || ''}
              onValueChange={(values) => onChange({ target: { name: 'costs', value: values.value } })}
              thousandSeparator
              prefix="$"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Ingresos */}
          <div>
            <label htmlFor="income" className="block text-gray-700 mb-1">Ingresos</label>
            <NumericFormat
              name="income"
              id="income"
              value={financeItem.income || ''}
              onValueChange={(values) => onChange({ target: { name: 'income', value: values.value } })}
              thousandSeparator
              prefix="$"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Fecha */}
          <div>
            <label htmlFor="date" className="block text-gray-700 mb-1">Fecha</label>
            <input
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                handleInputChange(e);
              }}
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={!!errors.date}
            />
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="description" className="block text-gray-700 mb-1">Descripción</label>
            <textarea
              name="description"
              id="description"
              value={financeItem.description || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              rows="2"
            />
          </div>

          {/* Botones */}
          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:ring-2 focus:ring-purple-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className={`px-4 py-2 ${isSaving ? 'bg-gray-400' : 'bg-purple-500 hover:bg-purple-600'} text-white rounded-lg focus:ring-2 focus:ring-purple-500`}
            >
              {isSaving ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
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
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    costs: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    income: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    date: PropTypes.string,
    description: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default FinanceItemForm;