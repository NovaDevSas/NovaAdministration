const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Endpoints para la gestión de empresas
 */

/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: Obtener todas las empresas
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: Lista de empresas obtenida exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.get('/', companyController.getCompanies);

/**
 * @swagger
 * /api/companies/finance-summary:
 *   get:
 *     summary: Obtener la lista de compañías con sus ingresos y gastos totales
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: Lista de compañías con ingresos y gastos totales obtenida exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.get('/finance-summary', companyController.getCompaniesFinanceSummary);


/**
 * @swagger
 * /api/companies/{id}:
 *   get:
 *     summary: Obtener una empresa por ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Empresa obtenida exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.get('/:id', companyController.getCompanyById);



/**
 * @swagger
 * /api/companies:
 *   post:
 *     summary: Crear una nueva empresa
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Empresa creada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', companyController.addCompany);

/**
 * @swagger
 * /api/companies/{id}:
 *   put:
 *     summary: Actualizar una empresa
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la empresa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Empresa actualizada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.put('/:id', companyController.updateCompany);

/**
 * @swagger
 * /api/companies/{id}:
 *   delete:
 *     summary: Eliminar una empresa
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Empresa eliminada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.delete('/:id', companyController.deleteCompany);

// Descargar ítems financieros en PDF
router.get('/download/pdf', companyController.downloadCompaniesPDF);

// Descargar ítems financieros en Excel
router.get('/download/excel', companyController.downloadCompaniesExcel);

module.exports = router;