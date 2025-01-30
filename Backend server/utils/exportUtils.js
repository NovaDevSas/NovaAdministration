const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');

exports.generatePDF = async (data, type) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      let buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      // Título del reporte
      doc.fontSize(20).text(`${type.charAt(0).toUpperCase() + type.slice(1)} Report`, { align: 'center' });
      doc.moveDown();

      // Validar si hay datos
      if (!data || data.length === 0) {
        doc.fontSize(14).text("No hay datos disponibles", { align: 'center' });
        doc.end();
        return;
      }

      // Formatear datos en el PDF
      data.forEach((item, index) => {
        doc.fontSize(12).text(`${index + 1}. Nombre: ${item.name || 'N/A'}`, { align: 'left' });
        doc.text(`   Tipo: ${item.type || 'N/A'}`);
        doc.text(`   Monto: ${item.amount || 0}`);
        doc.text(`   Fecha: ${item.date || 'N/A'}`);
        doc.text(`   Descripción: ${item.description || 'Sin descripción'}`);
        doc.moveDown();
      });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

exports.generateExcel = async (data, type) => {
  try {
    if (!data || data.length === 0) {
      throw new Error("No hay datos para exportar a Excel");
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`${type.charAt(0).toUpperCase() + type.slice(1)} Report`);

    // Obtener las columnas dinámicamente
    const columns = Object.keys(data[0]).map(key => ({ header: key, key }));
    worksheet.columns = columns;

    // Agregar datos a la hoja de cálculo
    data.forEach(item => {
      worksheet.addRow(item);
    });

    // Generar el buffer de Excel
    return await workbook.xlsx.writeBuffer();
  } catch (err) {
    console.error("Error generando Excel:", err);
    throw err;
  }
};
