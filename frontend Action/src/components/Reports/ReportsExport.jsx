import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const ReportsExport = ({ data }) => {
  const exportToPDF = () => {
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
    doc.save('reporte.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data.projects.map((project) => ({
      'Nombre del Proyecto': project.name,
      'Empresa': data.companies.find(company => company._id === project.companyId)?.name,
      'Ingresos': data.financeItems.filter(item => item.projectId === project._id && item.type === 'income').reduce((acc, item) => acc + item.amount, 0),
      'Gastos': data.financeItems.filter(item => item.projectId === project._id && item.type === 'expense').reduce((acc, item) => acc + item.amount, 0),
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
    XLSX.writeFile(workbook, 'reporte.xlsx');
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Exportar y Programar</h2>
      <div className="flex space-x-4">
        <button
          onClick={exportToPDF}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover"
        >
          Exportar a PDF
        </button>
        <button
          onClick={exportToExcel}
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-hover"
        >
          Exportar a Excel
        </button>
        <button
          onClick={printReport}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Imprimir
        </button>
      </div>
    </div>
  );
};

export default ReportsExport;