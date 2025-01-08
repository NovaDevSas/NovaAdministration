const Company = require('../models/Company');

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