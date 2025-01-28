import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL + '/tasks';

// Crear una nueva tarea
export const createTask = async (taskData) => {
  try {
    const response = await axios.post(API_URL, taskData);
    return response.data;
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    throw error;
  }
};

// Obtener todas las tareas
export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    throw error;
  }
};

// Obtener una tarea por ID
export const getTaskById = async (taskId) => {
  try {
    const response = await axios.get(`${API_URL}/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la tarea:', error);
    throw error;
  }
};

// Actualizar una tarea
export const updateTask = async (taskId, taskData) => {
  try {
    const response = await axios.put(`${API_URL}/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    throw error;
  }
};

// Eliminar una tarea
export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_URL}/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    throw error;
  }
};

// Obtener tareas por proyecto
export const getTasksByProject = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}/project/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las tareas por proyecto:', error);
    throw error;
  }
};

// Obtener tareas por responsable
export const getTasksByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las tareas por responsable:', error);
    throw error;
  }
};