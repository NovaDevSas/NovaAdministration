import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../../services/taskService';

const TaskPopup = ({ task, users, onClose, onUpdate, onCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    assignedTo: '',
    status: 'pending',
    estimatedCompletionDate: '',
    estimatedHours: '',
    comments: [],
    evidences: [],
  });
  const [newComment, setNewComment] = useState('');
  const [newEvidence, setNewEvidence] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
    } else {
      console.error('Usuario no encontrado en localStorage.');
    }
  }, []);

  useEffect(() => {
    if (task) {
      setFormData({
        name: task.name,
        description: task.description,
        assignedTo: task.assignedTo,
        status: task.status,
        estimatedCompletionDate: task.estimatedCompletionDate,
        estimatedHours: task.estimatedHours,
        comments: task.comments || [],
        evidences: task.evidences || [],
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleEvidenceChange = (e) => {
    setNewEvidence(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (task && task._id) {
        const updatedTask = await updateTask(task._id, formData);
        onUpdate(updatedTask);
      } else {
        const newTask = await createTask(formData);
        onCreate(newTask);
      }
      onClose();
    } catch (error) {
      console.error('Error al guardar la tarea:', error);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() && currentUser) {
      const comment = {
        text: newComment,
        user: currentUser._id,
        date: new Date(),
      };
      setFormData({ ...formData, comments: [...formData.comments, comment] });
      setNewComment('');
    } else {
      console.error('No se pudo agregar el comentario. Usuario no encontrado.');
    }
  };

  const handleAddEvidence = () => {
    if (newEvidence.trim() && currentUser) {
      const evidence = {
        url: newEvidence,
        user: currentUser._id,
        date: new Date(),
      };
      setFormData({ ...formData, evidences: [...formData.evidences, evidence] });
      setNewEvidence('');
    } else {
      console.error('No se pudo agregar la evidencia. Usuario no encontrado.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-5xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{task && task._id ? 'Editar Tarea' : 'Crear Tarea'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
          {/* Column 1: Task Fields */}
          <div className="col-span-1">
            <div className="mb-4">
              <label className="block text-gray-700">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Descripción</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Estado</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="pending">Pendiente</option>
                <option value="in-progress">En Progreso</option>
                <option value="completed">Completada</option>
                <option value="cancelled">Cancelada</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Asignado a</label>
              <select
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar usuario</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Fecha estimada de completar</label>
              <input
                type="date"
                name="estimatedCompletionDate"
                value={formData.estimatedCompletionDate ? new Date(formData.estimatedCompletionDate).toISOString().split('T')[0] : ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Tiempo estimado (horas)</label>
              <input
                type="number"
                name="estimatedHours"
                value={formData.estimatedHours}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Column 2: Comments */}
          <div className="col-span-1">
            <label className="block text-gray-700 mb-2">Comentarios</label>
            <ul className="mb-4 space-y-2">
              {formData.comments.map((comment, index) => (
                <li key={index} className="p-2 border border-gray-300 rounded-lg shadow-sm">
                  <p className="text-gray-600">{comment.text}</p>
                  <p className="text-gray-500 text-sm">{new Date(comment.date).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
            <input
              type="text"
              value={newComment}
              onChange={handleCommentChange}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Agregar comentario"
            />
            <button
              type="button"
              onClick={handleAddComment}
              className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Agregar Comentario
            </button>
          </div>

          {/* Column 3: Evidences */}
          <div className="col-span-1">
            <label className="block text-gray-700 mb-2">Evidencias</label>
            <ul className="mb-4 space-y-2">
              {formData.evidences.map((evidence, index) => (
                <li key={index} className="p-2 border border-gray-300 rounded-lg shadow-sm">
                  <a href={evidence.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {evidence.url}
                  </a>
                  <p className="text-gray-500 text-sm">{new Date(evidence.date).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
            <input
              type="text"
              value={newEvidence}
              onChange={handleEvidenceChange}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Agregar evidencia (URL)"
            />
            <button
              type="button"
              onClick={handleAddEvidence}
              className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Agregar Evidencia
            </button>
          </div>
        </form>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="mr-2 p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskPopup;