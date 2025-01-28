const express = require('express');
const router = express.Router();
const { createScheduledReport, getScheduledReports } = require('../controllers/scheduledReportController');

/**
 * @swagger
 * tags:
 *   name: ScheduledReports
 *   description: Endpoints para la gestión de reportes programados
 */

/**
 * @swagger
 * /api/scheduled-reports:
 *   post:
 *     summary: Crear una nueva configuración de reporte programado
 *     tags: [ScheduledReports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - frequency
 *               - reportType
 *               - format
 *             properties:
 *               userId:
 *                 type: string
 *               frequency:
 *                 type: string
 *               reportType:
 *                 type: string
 *               format:
 *                 type: string
 *     responses:
 *       201:
 *         description: Configuración de reporte programado creada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', createScheduledReport);

/**
 * @swagger
 * /api/scheduled-reports:
 *   get:
 *     summary: Obtener todas las configuraciones de reportes programados
 *     tags: [ScheduledReports]
 *     responses:
 *       200:
 *         description: Lista de configuraciones de reportes programados obtenida exitosamente
 *       500:
 *         description: Error en la solicitud
 */
router.get('/', getScheduledReports);

module.exports = router;