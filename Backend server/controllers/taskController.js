const Task = require('../models/Task');
const Project = require('../models/Project');

// Crear una nueva tarea
exports.createTask = async (req, res) => {
  const { name, status, assignedTo, estimatedCompletionDate, estimatedHours, description, projectId } = req.body;
  try {
    const task = new Task({ name, status, assignedTo, estimatedCompletionDate, estimatedHours, description, projectId });
    await task.save();

    const project = await Project.findById(projectId);
    project.tasks.push(task._id);
    await project.save();

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtener todas las tareas
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener una tarea por ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar una tarea
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar una tarea
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener tareas por proyecto
exports.getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener tareas por responsable
exports.getTasksByUser = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};