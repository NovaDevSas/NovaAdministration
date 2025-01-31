import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';

const ProjectForm = ({
  project = {},
  onChange,
  onSave,
  onCancel,
  isEditing,
}) => {
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!project.name) newErrors.name = 'El nombre es obligatorio.';
    if (!project.startDate) newErrors.startDate = 'La fecha de inicio es obligatoria.';
    if (!project.endDate) newErrors.endDate = 'La fecha de fin es obligatoria.';
    if (!project.budget || project.budget <= 0) newErrors.budget = 'El presupuesto debe ser mayor a cero.';
    if (!project.port) newErrors.port = 'El puerto es obligatorio.';
    if (!project.host) newErrors.host = 'El host es obligatorio.';
    if (!project.subdomain) newErrors.subdomain = 'El subdominio es obligatorio.';
    if (!project.status) newErrors.status = 'El estado es obligatorio.';
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
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
          {isEditing ? 'Actualizar Proyecto' : 'Crear Nuevo Proyecto'}
        </h2>

        {/* Mensajes de error */}
        {Object.keys(errors).length > 0 && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded-lg" aria-live="assertive">
            {Object.values(errors).map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-1">Nombre del Proyecto</label>
            <input
              type="text"
              name="name"
              id="name"
              value={project.name || ''}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={!!errors.name}
            />
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="description" className="block text-gray-700 mb-1">Descripción</label>
            <textarea
              name="description"
              id="description"
              value={project.description || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              rows="2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Fecha de Inicio */}
            <div>
              <label htmlFor="startDate" className="block text-gray-700 mb-1">Fecha de Inicio</label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                value={project.startDate || ''}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                  errors.startDate ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={!!errors.startDate}
              />
            </div>

            {/* Fecha de Fin */}
            <div>
              <label htmlFor="endDate" className="block text-gray-700 mb-1">Fecha de Fin</label>
              <input
                type="date"
                name="endDate"
                id="endDate"
                value={project.endDate || ''}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                  errors.endDate ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={!!errors.endDate}
              />
            </div>
          </div>

          {/* Presupuesto */}
          <div>
            <label htmlFor="budget" className="block text-gray-700 mb-1">Presupuesto</label>
            <NumericFormat
              name="budget"
              id="budget"
              value={project.budget || ''}
              onValueChange={(values) =>
                onChange({ target: { name: 'budget', value: values.value } })
              }
              thousandSeparator
              prefix="$"
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                errors.budget ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={!!errors.budget}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Puerto */}
            <div>
              <label htmlFor="port" className="block text-gray-700 mb-1">Puerto</label>
              <input
                type="text"
                name="port"
                id="port"
                value={project.port || ''}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                  errors.port ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={!!errors.port}
              />
            </div>

            {/* Host */}
            <div>
              <label htmlFor="host" className="block text-gray-700 mb-1">Host</label>
              <input
                type="text"
                name="host"
                id="host"
                value={project.host || ''}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                  errors.host ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={!!errors.host}
              />
            </div>

            {/* Subdominio */}
            <div>
              <label htmlFor="subdomain" className="block text-gray-700 mb-1">Subdominio</label>
              <input
                type="text"
                name="subdomain"
                id="subdomain"
                value={project.subdomain || ''}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                  errors.subdomain ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={!!errors.subdomain}
              />
            </div>
          </div>

          {/* Estado */}
          <div>
            <label htmlFor="status" className="block text-gray-700 mb-1">Estado</label>
            <select
              name="status"
              id="status"
              value={project.status || 'active'}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                errors.status ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={!!errors.status}
            >
              <option value="active">Activo</option>
              <option value="processing">En Proceso</option>
              <option value="completed">Completado</option>
              <option value="inactive">Inactivo</option>
            </select>
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

ProjectForm.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    budget: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    port: PropTypes.string,
    host: PropTypes.string,
    subdomain: PropTypes.string,
    status: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default ProjectForm;