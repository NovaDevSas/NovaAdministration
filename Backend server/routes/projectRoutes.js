const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectById,
  getProjectsByCompany, // Asegúrate de importar el controlador correcto
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

// Obtener todos los proyectos
router.get('/', getProjects);

// Obtener proyectos por ID de empresa
router.get('/company/:companyId', getProjectsByCompany); // Definir la ruta correcta

// Obtener un proyecto por ID
router.get('/:id', getProjectById);

// Crear un nuevo proyecto
router.post('/', createProject);

// Actualizar un proyecto existente
router.put('/:id', updateProject);

// Eliminar un proyecto
router.delete('/:id', deleteProject);

module.exports = router;