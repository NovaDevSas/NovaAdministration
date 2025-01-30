const FinanceItem = require('../models/FinanceItem');
const { generatePDF, generateExcel } = require('../utils/exportUtils');

// Obtener todos los ítems financieros
exports.getAllFinanceItems = async (req, res) => {
  try {
    const financeItems = await FinanceItem.find();
    res.json(financeItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener todos los ítems financieros de un proyecto
exports.getFinanceItemsByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const financeItems = await FinanceItem.find({ projectId });
    if (!financeItems || financeItems.length === 0) {
      return res.status(404).json({ message: 'No se encontraron ítems financieros para este proyecto' });
    }
    res.json(financeItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo ítem financiero
exports.createFinanceItem = async (req, res) => {
  const { name, type, projectId, frequency, amount, description, date, discounts, costs, income } = req.body;

  if (!name || !type || !projectId || !frequency || !amount || !date) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const financeItem = new FinanceItem({ name, type, projectId, frequency, amount, description, date, discounts, costs, income });

  try {
    const newFinanceItem = await financeItem.save();
    res.status(201).json(newFinanceItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar un ítem financiero
exports.updateFinanceItem = async (req, res) => {
  const { name, type, projectId, frequency, amount, description, date, discounts, costs, income } = req.body;

  if (!name || !type || !projectId || !frequency || !amount || !date) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const updatedFinanceItem = await FinanceItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedFinanceItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un ítem financiero
exports.deleteFinanceItem = async (req, res) => {
  try {
    await FinanceItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ítem financiero eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener el resumen financiero de un proyecto
exports.getFinanceSummaryByProject = async (req, res) => {
  try {
    console.log(`Fetching finance summary for project ID: ${req.params.projectId}`);
    const financeItems = await FinanceItem.find({ projectId: req.params.projectId });
    if (!financeItems || financeItems.length === 0) {
      return res.status(404).json({ message: 'No se encontraron ítems financieros para este proyecto' });
    }
    const summary = financeItems.reduce(
      (acc, item) => {
        acc.amount += item.amount || 0;
        acc.costs += item.costs || 0;
        acc.income += item.income || 0;
        return acc;
      },
      { amount: 0, costs: 0, income: 0 }
    );
    console.log(`Finance summary for project ID: ${req.params.projectId}`, summary);
    res.json(summary);
  } catch (err) {
    console.error('Error al obtener el resumen financiero:', err);
    res.status(500).json({ message: 'Error al obtener el resumen financiero', error: err.message });
  }
};

// Descargar ítems financieros en PDF
exports.downloadFinanceItemsPDF = async (req, res) => {
  try {
    console.log("Generating PDF for finance items...");
    const financeItems = await FinanceItem.find();

    if (!financeItems || financeItems.length === 0) {
      console.log("No finance items found for PDF export.");
      return res.status(404).json({ message: 'No hay ítems financieros disponibles para exportar' });
    }

    console.log("Sanitizing finance items for PDF...");
    const sanitizedFinanceItems = financeItems.map(item => ({
      name: item.name || 'N/A',
      type: item.type || 'N/A',
      amount: item.amount || 0,
      date: item.date || new Date().toISOString(),
      description: item.description || 'Sin descripción'
    }));

    const pdfBuffer = await generatePDF(sanitizedFinanceItems, 'financeItems');

    if (!pdfBuffer) {
      throw new Error("Failed to generate PDF buffer.");
    }

    console.log("PDF generated successfully.");
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="financeItems.pdf"');
    res.send(pdfBuffer);
  } catch (err) {
    console.error("Error downloading finance items PDF:", err);
    res.status(500).json({ message: 'Error al descargar los ítems financieros en PDF', error: err.message });
  }
};

// Descargar ítems financieros en Excel
exports.downloadFinanceItemsExcel = async (req, res) => {
  try {
    console.log("Generating Excel for finance items...");
    const financeItems = await FinanceItem.find();

    if (!financeItems || financeItems.length === 0) {
      console.log("No finance items found for Excel export.");
      return res.status(404).json({ message: 'No hay ítems financieros disponibles para exportar' });
    }

    console.log("Sanitizing finance items for Excel...");
    const sanitizedFinanceItems = financeItems.map(item => ({
      name: item.name || 'N/A',
      type: item.type || 'N/A',
      amount: item.amount || 0,
      date: item.date || new Date().toISOString(),
      description: item.description || 'Sin descripción'
    }));

    const excelBuffer = await generateExcel(sanitizedFinanceItems, 'financeItems');

    if (!excelBuffer) {
      throw new Error("Failed to generate Excel buffer.");
    }

    console.log("Excel generated successfully.");
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="financeItems.xlsx"');
    res.send(excelBuffer);
  } catch (err) {
    console.error("Error downloading finance items Excel:", err);
    res.status(500).json({ message: 'Error al descargar los ítems financieros en Excel', error: err.message });
  }
};