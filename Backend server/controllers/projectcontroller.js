const Project = require('../models/Project');
const { generatePDF, generateExcel } = require('../utils/exportUtils');


// Obtener todos los proyectos
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los proyectos' });
  }
};

// Obtener proyectos por ID de empresa
exports.getProjectsByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const projects = await Project.find({ companyId });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los proyectos por empresa', error });
  }
};

// Obtener un proyecto por ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el proyecto' });
  }
};

// Crear un nuevo proyecto
exports.createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el proyecto', error });
  }
};

// Actualizar un proyecto existente
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(id, req.body, { new: true });
    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el proyecto', error });
  }
};

// Eliminar un proyecto
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.status(200).json({ message: 'Proyecto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el proyecto', error });
  }
};

const FinanceItem = require('../models/FinanceItem');

// Obtener proyectos con la suma de ingresos y gastos
exports.getProjectsWithFinanceSummary = async (req, res) => {
  try {
    const projects = await Project.aggregate([
      {
        $lookup: {
          from: 'financeitems', // Asegúrate de que el nombre de la colección esté en minúsculas
          localField: '_id',
          foreignField: 'projectId',
          as: 'financeItems'
        }
      },
      {
        $addFields: {
          totalIncome: {
            $sum: {
              $map: {
                input: '$financeItems',
                as: 'item',
                in: {
                  $cond: [{ $eq: ['$$item.type', 'income'] }, '$$item.amount', 0]
                }
              }
            }
          },
          totalExpense: {
            $sum: {
              $map: {
                input: '$financeItems',
                as: 'item',
                in: {
                  $cond: [{ $eq: ['$$item.type', 'expense'] }, '$$item.amount', 0]
                }
              }
            }
          }
        }
      },
      {
        $project: {
          name: 1,
          description: 1,
          startDate: 1,
          endDate: 1,
          companyId: 1,
          status: 1,
          budget: 1,
          port: 1,
          host: 1,
          subdomain: 1,
          totalIncome: 1,
          totalExpense: 1
        }
      }
    ]);
    res.json(projects);
  } catch (error) {
    console.error('Error al obtener el resumen financiero de los proyectos:', error);
    res.status(500).json({ message: 'Error al obtener el resumen financiero de los proyectos', error });
  }
};
// Descargar proyectos en PDF
exports.downloadProjectsPDF = async (req, res) => {
  try {
    const projects = await Project.find();
    const pdfBuffer = await generatePDF(projects, 'projects');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=projects.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ message: 'Error al descargar los proyectos en PDF', error });
  }
};

// Descargar proyectos en Excel
exports.downloadProjectsExcel = async (req, res) => {
  try {
    const projects = await Project.find();
    const excelBuffer = await generateExcel(projects, 'projects');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=projects.xlsx');
    res.send(excelBuffer);
  } catch (error) {
    res.status(500).json({ message: 'Error al descargar los proyectos en Excel', error });
  }
};
