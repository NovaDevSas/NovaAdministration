import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';

const ProjectForm = ({ project, onChange, onSave, onCancel, isEditing }) => {
  const [startDate, setStartDate] = useState(project.startDate || '');
  const [endDate, setEndDate] = useState(project.endDate || '');

  // Sincronizar fechas con el estado local
  useEffect(() => {
    setStartDate(project.startDate || '');
    setEndDate(project.endDate || '');
  }, [project]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === 'startDate') {
      setStartDate(value);
    } else if (name === 'endDate') {
      setEndDate(value);
    }
    onChange(e);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
          {isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto'}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
        >
          {/* Nombre del Proyecto */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Nombre del Proyecto
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={project.name}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
              aria-label="Nombre del Proyecto"
            />
          </div>

          {/* Descripción */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="description">
              Descripción
            </label>
            <textarea
              name="description"
              id="description"
              value={project.description}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
              aria-label="Descripción del Proyecto"
            />
          </div>

          {/* Fecha de Inicio */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="startDate">
              Fecha de Inicio
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              value={startDate}
              onChange={handleDateChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
              aria-label="Fecha de Inicio"
            />
          </div>

          {/* Fecha de Fin */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="endDate">
              Fecha de Fin
            </label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              value={endDate}
              onChange={handleDateChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
              aria-label="Fecha de Fin"
            />
          </div>

          {/* Presupuesto */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="budget">
              Presupuesto
            </label>
            <NumericFormat
              name="budget"
              id="budget"
              value={project.budget}
              onValueChange={(values) => {
                const { value } = values;
                onChange({ target: { name: 'budget', value } });
              }}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
              thousandSeparator={true}
              prefix={'$'}
              aria-label="Presupuesto del Proyecto"
            />
          </div>

          {/* Estado */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="status">
              Estado
            </label>
            <select
              name="status"
              id="status"
              value={project.status}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
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
              aria-label="Cancelar"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 transition"
              aria-label={isEditing ? 'Actualizar Proyecto' : 'Crear Proyecto'}
            >
              {isEditing ? 'Actualizar' : 'Crear'}
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