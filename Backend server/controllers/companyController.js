const Company = require('../models/Company');
const Project = require('../models/Project'); // Importar el modelo Project
const FinanceItem = require('../models/FinanceItem'); // Importar el modelo FinanceItem


// Obtener todas las empresas
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Obtener una empresa por ID
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Obtener la lista de compañías con sus ingresos y gastos totales
exports.getCompaniesFinanceSummary = async (req, res) => {
  try {
    const companies = await Company.find();
    console.log('Companies:', companies);

    const companiesFinanceSummary = await Promise.all(companies.map(async (company) => {
      const projects = await Project.find({ companyId: company._id });
      console.log('Projects for company', company._id, ':', projects);
      const projectIds = projects.map(project => project._id);

      const incomeItems = await FinanceItem.find({ projectId: { $in: projectIds }, type: 'income' });
      console.log('Income items for company', company._id, ':', incomeItems);
      const expenseItems = await FinanceItem.find({ projectId: { $in: projectIds }, type: 'expense' });
      console.log('Expense items for company', company._id, ':', expenseItems);

      const totalIncome = incomeItems.reduce((acc, item) => acc + item.amount, 0);
      const totalExpenses = expenseItems.reduce((acc, item) => acc + item.amount, 0);

      return {
        company,
        totalIncome,
        totalExpenses
      };
    }));

    res.json(companiesFinanceSummary);
  } catch (err) {
    console.error('Error al obtener el resumen financiero de las compañías:', err);
    res.status(500).json({ message: 'Error al obtener el resumen financiero de las compañías', error: err.message });
  }
};


// Crear una nueva empresa
exports.addCompany = async (req, res) => {
  const { name, contact, status, code, nit, email, address } = req.body;
  try {
    const newCompany = new Company({ name, contact, status, code, nit, email, address });
    const company = await newCompany.save();
    res.status(201).json(company);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

// Actualizar una empresa
exports.updateCompany = async (req, res) => {
  const { name, contact, status, code, nit, email, address } = req.body;
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      { name, contact, status, code, nit, email, address },
      { new: true, runValidators: true }
    );
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

// Eliminar una empresa
exports.deleteCompany = async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.json({ message: 'Company deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Descargar ítems financieros en PDF
exports.downloadCompaniesPDF = async (req, res) => {
  try {
    console.log("Generating PDF for finance items...");
    const financeItems = await Company.find();

    if (!financeItems || financeItems.length === 0) {
      console.log("No finance items found for PDF export.");
      return res.status(404).json({ message: 'No hay ítems financieros disponibles para exportar' });
    }

    console.log("Sanitizing finance items for PDF...");
    const sanitizedFinanceItems = financeItems.map(item => ({
      name: item.name || 'N/A',
      contact: item.type || 'N/A',
      status: item.type || 'N/A',
      code: item.type || 'N/A',
      nit: item.type || 'N/A',
      email: item.type || 'N/A',
      address: item.type || 'N/A'
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
exports.downloadCompaniesExcel = async (req, res) => {
  try {
    console.log("Generating Excel for finance items...");
    const financeItems = await Company.find();

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