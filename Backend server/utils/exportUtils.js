const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');

const formatDataForPDF = (data, type) => {
  return data.map((item, index) => {
    let formattedItem = `${index + 1}. Nombre: ${item.name || 'N/A'}`;
    if (type === 'companies') {
      formattedItem += `
        Contacto: ${item.contact || 'N/A'}
        Estado: ${item.status || 'N/A'}
        Código: ${item.code || 'N/A'}
        NIT: ${item.nit || 'N/A'}
        Email: ${item.email || 'N/A'}
        Dirección: ${item.address || 'N/A'}
      `;
    } else if (type === 'tasks') {
      formattedItem += `
        Estado: ${item.status || 'N/A'}
        Asignado a: ${item.assignedTo || 'N/A'}
        Fecha estimada de finalización: ${item.estimatedCompletionDate || 'N/A'}
        Horas estimadas: ${item.estimatedHours || 'N/A'}
        Descripción: ${item.description || 'Sin descripción'}
        ID del proyecto: ${item.projectId || 'N/A'}
      `;
    } else if (type === 'projects') {
      formattedItem += `
        Descripción: ${item.description || 'Sin descripción'}
        Fecha de inicio: ${item.startDate || 'N/A'}
        Fecha de finalización: ${item.endDate || 'N/A'}
        ID de la empresa: ${item.companyId || 'N/A'}
        Estado: ${item.status || 'N/A'}
        Presupuesto: ${item.budget || 'N/A'}
        Puerto: ${item.port || 'N/A'}
        Host: ${item.host || 'N/A'}
        Subdominio: ${item.subdomain || 'N/A'}
      `;
    } else if (type === 'financeItems') {
      formattedItem += `
        Tipo: ${item.type || 'N/A'}
        Monto: ${item.amount || 0}
        Fecha: ${item.date || 'N/A'}
        Descripción: ${item.description || 'Sin descripción'}
      `;
    }
    return formattedItem;
  });
};

const formatDataForExcel = (data, type) => {
  return data.map(item => {
    if (type === 'companies') {
      return {
        Name: item.name || 'N/A',
        Contact: item.contact || 'N/A',
        Status: item.status || 'N/A',
        Code: item.code || 'N/A',
        NIT: item.nit || 'N/A',
        Email: item.email || 'N/A',
        Address: item.address || 'N/A'
      };
    } else if (type === 'tasks') {
      return {
        Name: item.name || 'N/A',
        Status: item.status || 'N/A',
        AssignedTo: item.assignedTo || 'N/A',
        EstimatedCompletionDate: item.estimatedCompletionDate || 'N/A',
        EstimatedHours: item.estimatedHours || 'N/A',
        Description: item.description || 'Sin descripción',
        ProjectId: item.projectId || 'N/A'
      };
    } else if (type === 'projects') {
      return {
        Name: item.name || 'N/A',
        Description: item.description || 'Sin descripción',
        StartDate: item.startDate || 'N/A',
        EndDate: item.endDate || 'N/A',
        CompanyId: item.companyId || 'N/A',
        Status: item.status || 'N/A',
        Budget: item.budget || 'N/A',
        Port: item.port || 'N/A',
        Host: item.host || 'N/A',
        Subdomain: item.subdomain || 'N/A'
      };
    } else if (type === 'financeItems') {
      return {
        Name: item.name || 'N/A',
        Type: item.type || 'N/A',
        Amount: item.amount || 0,
        Date: item.date || 'N/A',
        Description: item.description || 'Sin descripción'
      };
    }
  });
};

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
      const formattedData = formatDataForPDF(data, type);
      formattedData.forEach(item => {
        doc.fontSize(12).text(item, { align: 'left' });
        doc.moveDown();
      });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

exports.generateExcel = async (data, type) => {
  return new Promise((resolve, reject) => {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet(`${type.charAt(0).toUpperCase() + type.slice(1)} Report`);

      // Formatear datos para Excel
      const formattedData = formatDataForExcel(data, type);

      // Definir las columnas del Excel
      if (formattedData.length > 0) {
        worksheet.columns = Object.keys(formattedData[0]).map(key => ({
          header: key,
          key,
          width: 20
        }));
      }

      // Agregar filas al Excel
      formattedData.forEach(item => {
        worksheet.addRow(item);
      });

      // Generar el buffer del Excel
      workbook.xlsx.writeBuffer().then(buffer => {
        resolve(buffer);
      }).catch(err => {
        reject(err);
      });
    } catch (err) {
      reject(err);
    }
  });
};