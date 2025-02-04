import React from 'react';
import { FaPlus } from 'react-icons/fa';

const TaskActions = ({ onAdd }) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={onAdd}
        className="p-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition-transform transform hover:scale-110 focus:outline-none"
        title="Agregar Tarea"
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default TaskActions;