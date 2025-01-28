const jsPDF = require('jspdf');
require('jspdf-autotable');
const XLSX = require('xlsx');

const exportToPDF = (data) => {
  console.log('Generating PDF report...');
  const doc = new jsPDF();
  doc.text('Reporte de Datos', 20, 10);

  const tableColumn = ['Nombre del Proyecto', 'Empresa', 'Ingresos', 'Gastos'];
  const tableRows = [];

  data.projects.forEach((project) => {
    const projectData = [
      project.name,
      data.companies.find(company => company._id === project.companyId)?.name,
      data.financeItems.filter(item => item.projectId === project._id && item.type === 'income').reduce((acc, item) => acc + item.amount, 0),
      data.financeItems.filter(item => item.projectId === project._id && item.type === 'expense').reduce((acc, item) => acc + item.amount, 0),
    ];
    tableRows.push(projectData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  return doc.output();
};

const exportToExcel = (data) => {
  console.log('Generating Excel report...');
  const worksheet = XLSX.utils.json_to_sheet(data.projects.map((project) => ({
    'Nombre del Proyecto': project.name,
    'Empresa': data.companies.find(company => company._id === project.companyId)?.name,
    'Ingresos': data.financeItems.filter(item => item.projectId === project._id && item.type === 'income').reduce((acc, item) => acc + item.amount, 0),
    'Gastos': data.financeItems.filter(item => item.projectId === project._id && item.type === 'expense').reduce((acc, item) => acc + item.amount, 0),
  })));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
};

module.exports = {
  exportToPDF,
  exportToExcel,
};