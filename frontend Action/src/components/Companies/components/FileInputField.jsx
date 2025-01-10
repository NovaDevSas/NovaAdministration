import React from 'react';

const FileInputField = ({ label, name, onChange, error, required = false }) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="file"
      name={name}
      onChange={onChange}
      className={`w-full p-2 border rounded-md focus:ring-2 focus:outline-none transition ${
        error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'
      }`}
    />
    {error && (
      <p className="text-red-500 text-xs mt-1 animate-fade-in">{error}</p>
    )}
  </div>
);

export default FileInputField;