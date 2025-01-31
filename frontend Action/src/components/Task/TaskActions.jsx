import React from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const TaskActions = ({ onAdd, onDelete, selectedTask }) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={onAdd}
        className="p-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition-transform transform hover:scale-110 focus:outline-none"
        title="Agregar Tarea"
      >
        <FaPlus />
      </button>
      <button
        onClick={() => selectedTask && onDelete(selectedTask._id)}
        className="p-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-transform transform hover:scale-110 focus:outline-none"
        title="Eliminar Tarea"
        disabled={!selectedTask}
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default TaskActions;