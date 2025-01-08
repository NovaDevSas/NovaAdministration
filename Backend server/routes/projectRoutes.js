const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const projectController = require('../controllers/projectController');

// Crear un nuevo proyecto
router.post('/', projectController.createProject);

// Obtener todos los proyectos de una empresa
router.get('/company/:companyId', projectController.getProjectsByCompany);

// Obtener un proyecto por ID
router.get('/:id', projectController.getProjectById);

// Actualizar un proyecto
router.put('/:id', projectController.updateProject);

// Eliminar un proyecto
router.delete('/:id', projectController.deleteProject);

module.exports = router;