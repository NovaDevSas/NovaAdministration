const express = require('express');
const router = express.Router();
const financeItemController = require('../controllers/financeItemController');

/**
 * @swagger
 * tags:
 *   name: FinanceItems
 *   description: Endpoints para la gestión de ítems financieros
 */

/**
 * @swagger
 * /api/finance-items/{projectId}:
 *   get:
 *     summary: Obtener todos los ítems financieros de un proyecto
 *     tags: [FinanceItems]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del proyecto
 *     responses:
 *       200:
 *         description: Lista de ítems financieros obtenida exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.get('/:projectId', financeItemController.getFinanceItemsByProject);

/**
 * @swagger
 * /api/finance-items:
 *   post:
 *     summary: Crear un nuevo ítem financiero
 *     tags: [FinanceItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - projectId
 *               - amount
 *             properties:
 *               name:
 *                 type: string
 *               projectId:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Ítem financiero creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', financeItemController.createFinanceItem);

/**
 * @swagger
 * /api/finance-items/{id}:
 *   put:
 *     summary: Actualizar un ítem financiero
 *     tags: [FinanceItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del ítem financiero
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               projectId:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Ítem financiero actualizado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.put('/:id', financeItemController.updateFinanceItem);

/**
 * @swagger
 * /api/finance-items/{id}:
 *   delete:
 *     summary: Eliminar un ítem financiero
 *     tags: [FinanceItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del ítem financiero
 *     responses:
 *       200:
 *         description: Ítem financiero eliminado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.delete('/:id', financeItemController.deleteFinanceItem);

/**
 * @swagger
 * /api/finance-items/summary/{projectId}:
 *   get:
 *     summary: Obtener el resumen financiero de un proyecto
 *     tags: [FinanceItems]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del proyecto
 *     responses:
 *       200:
 *         description: Resumen financiero obtenido exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.get('/summary/:projectId', financeItemController.getFinanceSummaryByProject);

module.exports = router;