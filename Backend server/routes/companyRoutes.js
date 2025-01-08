const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

// Obtener todas las empresas
router.get('/', companyController.getCompanies);

// Obtener una empresa por ID
router.get('/:id', companyController.getCompanyById);

// Crear una nueva empresa
router.post('/', companyController.addCompany);

// Actualizar una empresa
router.put('/:id', companyController.updateCompany);

// Eliminar una empresa
router.delete('/:id', companyController.deleteCompany);

module.exports = router;