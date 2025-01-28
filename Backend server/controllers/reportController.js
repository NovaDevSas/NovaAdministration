const Project = require('../models/Project');
const Company = require('../models/Company');
const FinanceItem = require('../models/FinanceItem');
const Task = require('../models/Task');

exports.getReportData = async (req, res) => {
  try {
    const companies = await Company.find();
    const projects = await Project.find();
    const financeItems = await FinanceItem.find();
    const tasks = await Task.find();

    res.json({
      companies,
      projects,
      financeItems,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los datos del reporte', error });
  }
};