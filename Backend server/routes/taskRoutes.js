const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// CRUD completo
router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

// Obtener tareas por proyecto
router.get('/project/:projectId', taskController.getTasksByProject);

// Obtener tareas por responsable
router.get('/user/:userId', taskController.getTasksByUser);

module.exports = router;