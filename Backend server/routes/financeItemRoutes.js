const express = require('express');
const router = express.Router();
const financeItemController = require('../controllers/financeItemController');

// Obtener todos los ítems financieros de un proyecto
router.get('/:projectId', financeItemController.getFinanceItemsByProject);

// Crear un nuevo ítem financiero
router.post('/', financeItemController.createFinanceItem);

// Actualizar un ítem financiero
router.put('/:id', financeItemController.updateFinanceItem);

// Eliminar un ítem financiero
router.delete('/:id', financeItemController.deleteFinanceItem);

module.exports = router;