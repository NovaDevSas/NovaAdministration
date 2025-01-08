import React, { useState } from 'react';

const InputField = ({ label, name, value, onChange, error, type = 'text', required = false }) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-2 border rounded-md focus:ring-2 focus:outline-none transition ${
        error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'
      }`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const SelectField = ({ label, name, value, onChange, options, required = false }) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded-md focus:ring-2 focus:outline-none transition border-gray-300 focus:ring-purple-500"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const CompanyForm = ({ company, onChange, onSave, onCancel, isEditing }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!company.name) newErrors.name = 'El nombre de la empresa es obligatorio.';
    if (!company.contact) newErrors.contact = 'El contacto es obligatorio.';
    if (!company.email) newErrors.email = 'El correo electrónico es obligatorio.';
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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-30">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full border-t-4 border-purple-500 transform scale-95 hover:scale-100 transition-transform duration-300">
        <h2 className="text-xl font-bold text-gray-800 mb-3 text-center">
          {isEditing ? `Editar Empresa: ${company.name}` : 'Crear Nueva Empresa'}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-3"
        >
          <InputField
            label="Nombre de la Empresa"
            name="name"
            value={company.name}
            onChange={onChange}
            error={errors.name}
            required
          />
          <InputField
            label="Contacto"
            name="contact"
            value={company.contact}
            onChange={onChange}
            error={errors.contact}
            required
          />
          <InputField
            label="Correo Electrónico"
            name="email"
            value={company.email}
            onChange={onChange}
            error={errors.email}
            type="email"
            required
          />
          <SelectField
            label="Estado"
            name="status"
            value={company.status}
            onChange={onChange}
            options={[
              { value: 'activa', label: 'Activa' },
              { value: 'inactiva', label: 'Inactiva' },
            ]}
            required
          />
          <InputField
            label="Código"
            name="code"
            value={company.code}
            onChange={onChange}
          />
          <InputField
            label="NIT"
            name="nit"
            value={company.nit}
            onChange={onChange}
          />
          <InputField
            label="Dirección"
            name="address"
            value={company.address}
            onChange={onChange}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:ring-2 focus:ring-purple-400"
            >
              {isEditing ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyForm;