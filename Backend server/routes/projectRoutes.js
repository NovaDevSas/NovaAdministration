const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectById,
  getProjectsByCompany,
  createProject,
  updateProject,
  deleteProject,
  getProjectsWithFinanceSummary,
  downloadProjectsPDF,
  downloadProjectsExcel
} = require('../controllers/projectController');

// Obtener proyectos con la suma de ingresos y gastos
router.get('/summary', getProjectsWithFinanceSummary); // Asegúrate de que esta ruta esté antes de la ruta con ID

// Obtener todos los proyectos
router.get('/', getProjects);

// Obtener proyectos por ID de empresa
router.get('/company/:companyId', getProjectsByCompany);

// Obtener un proyecto por ID
router.get('/:id', getProjectById);

// Crear un nuevo proyecto
router.post('/', createProject);

// Actualizar un proyecto existente
router.put('/:id', updateProject);

// Eliminar un proyecto
router.delete('/:id', deleteProject);

// Descargar proyectos en PDF
router.get('/download/pdf', downloadProjectsPDF);

// Descargar proyectos en Excel
router.get('/download/excel', downloadProjectsExcel);

module.exports = router;