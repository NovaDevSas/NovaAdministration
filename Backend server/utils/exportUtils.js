const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');

exports.generatePDF = async (data, type) => {
  const doc = new PDFDocument();
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  doc.fontSize(25).text(`${type.charAt(0).toUpperCase() + type.slice(1)} Report`, { align: 'center' });

  data.forEach((item, index) => {
    doc.fontSize(12).text(`${index + 1}. ${JSON.stringify(item)}`, { align: 'left' });
  });

  doc.end();
  return Buffer.concat(buffers);
};

exports.generateExcel = async (data, type) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(`${type.charAt(0).toUpperCase() + type.slice(1)} Report`);

  const columns = Object.keys(data[0]._doc).map(key => ({ header: key, key }));
  worksheet.columns = columns;

  data.forEach(item => {
    worksheet.addRow(item._doc);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};