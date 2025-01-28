const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Endpoints para la generación de reportes
 */

/**
 * @swagger
 * /api/reports:
 *   get:
 *     summary: Obtener datos para los reportes
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Datos obtenidos exitosamente
 *       500:
 *         description: Error en la solicitud
 */
router.get('/', reportController.getReportData);

module.exports = router;