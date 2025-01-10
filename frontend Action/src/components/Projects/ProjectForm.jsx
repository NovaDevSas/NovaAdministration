import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';

const ProjectForm = ({ project, onChange, onSave, onCancel, isEditing }) => {
  const [startDate, setStartDate] = useState(project.startDate || '');
  const [endDate, setEndDate] = useState(project.endDate || '');
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Sincronizar fechas con el estado local
  useEffect(() => {
    setStartDate(project.startDate || '');
    setEndDate(project.endDate || '');
  }, [project]);

  const validateForm = () => {
    const newErrors = {};
    if (!project.name) newErrors.name = 'El nombre del proyecto es obligatorio.';
    if (!project.description) newErrors.description = 'La descripción es obligatoria.';
    if (new Date(startDate) > new Date(endDate)) newErrors.dates = 'La fecha de inicio no puede ser posterior a la de fin.';
    if (!project.budget || Number(project.budget) <= 0) newErrors.budget = 'El presupuesto debe ser mayor a 0.';
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
          {isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto'}
        </h2>
        <form onSubmit={handleSave}>
          {/* Nombre del Proyecto */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-1">
              Nombre del Proyecto
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={project.name}
              onChange={onChange}
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={!!errors.name}
              aria-describedby="name-error"
            />
            {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Descripción */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              name="description"
              id="description"
              value={project.description}
              onChange={onChange}
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={!!errors.description}
              aria-describedby="description-error"
            />
            {errors.description && <p id="description-error" className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Fecha de Inicio */}
          <div className="mb-4">
            <label htmlFor="startDate" className="block text-gray-700 mb-1">
              Fecha de Inicio
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                onChange(e);
              }}
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                errors.dates ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={!!errors.dates}
              aria-describedby="dates-error"
            />
          </div>

          {/* Fecha de Fin */}
          <div className="mb-4">
            <label htmlFor="endDate" className="block text-gray-700 mb-1">
              Fecha de Fin
            </label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                onChange(e);
              }}
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                errors.dates ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={!!errors.dates}
              aria-describedby="dates-error"
            />
            {errors.dates && <p id="dates-error" className="text-red-500 text-sm mt-1">{errors.dates}</p>}
          </div>

          {/* Presupuesto */}
          <div className="mb-4">
            <label htmlFor="budget" className="block text-gray-700 mb-1">
              Presupuesto
            </label>
            <NumericFormat
              name="budget"
              id="budget"
              value={project.budget}
              onValueChange={(values) => onChange({ target: { name: 'budget', value: values.value } })}
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                errors.budget ? 'border-red-500' : 'border-gray-300'
              }`}
              thousandSeparator
              prefix="$"
              aria-invalid={!!errors.budget}
              aria-describedby="budget-error"
            />
            {errors.budget && <p id="budget-error" className="text-red-500 text-sm mt-1">{errors.budget}</p>}
          </div>

          {/* Estado */}
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700 mb-1">
              Estado
            </label>
            <select
              name="status"
              id="status"
              value={project.status}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              aria-label="Estado del Proyecto"
            >
              <option value="active">Activo</option>
              <option value="processing">En Proceso</option>
              <option value="completed">Completado</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:ring-2 focus:ring-purple-500 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className={`px-4 py-2 ${
                isSaving ? 'bg-gray-400' : 'bg-purple-500 hover:bg-purple-600'
              } text-white rounded-lg focus:ring-2 focus:ring-purple-500 transition`}
            >
              {isSaving ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProjectForm.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    budget: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default ProjectForm;
