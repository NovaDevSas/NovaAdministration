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
      const doc = new PDFDocument({ 
        margin: 50,
        bufferPages: true // Para manejar múltiples páginas
      });
      let buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      // Estilo del encabezado
      doc.fillColor('#1E90FF')
         .fontSize(20)
         .font('Helvetica-Bold')
         .text(`${type.charAt(0).toUpperCase() + type.slice(1)} Report`, { align: 'center' });
      
      // Línea decorativa bajo el título
      doc.moveTo(50, 90)
         .lineTo(doc.page.width - 50, 90)
         .lineWidth(2)
         .strokeColor('#1E90FF')
         .stroke();

      doc.moveDown(1.5);

      // Validación de datos
      if (!data || data.length === 0) {
        doc.fontSize(14)
           .fillColor('#FF4444')
           .text("⚠️ No hay datos disponibles", { align: 'center' });
        doc.end();
        return;
      }

      // Contenido estilizado
      const formattedData = formatDataForPDF(data, type);
      formattedData.forEach((item, index) => {
        // Fondo alternado para items
        if (index % 2 === 0) {
          doc.rect(50, doc.y, doc.page.width - 100, 20)
             .fillColor('#F8F9FA')
             .fill();
        }

        doc.font('Helvetica-Bold')
           .fillColor('#2D3436')
           .text(`${index + 1}. ${item.name || 'N/A'}`, { indent: 10 });
        
        doc.font('Helvetica')
           .fillColor('#636E72')
           .text(item.replace(`${index + 1}. Nombre: ${item.name || 'N/A'}`, ''), {
             indent: 30,
             paragraphGap: 5
           });

        doc.moveDown();
      });

      // Pie de página
      const totalPages = doc.bufferedPageRange().count;
      for (let i = 0; i < totalPages; i++) {
        doc.switchToPage(i);
        doc.fillColor('#666666')
           .fontSize(10)
           .text(
             `Página ${i + 1} de ${totalPages}`,
             50,
             doc.page.height - 30,
             { align: 'center' }
           );
      }

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

      // Estilo mejorado para encabezados
      worksheet.getRow(1).eachCell(cell => {
        cell.font = { 
          bold: true, 
          color: { argb: 'FFFFFFFF' }, 
          size: 12,
          name: 'Calibri'
        };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF1E90FF' }
        };
        cell.border = {
          top: { style: 'thin', color: { argb: 'FF000000' } },
          bottom: { style: 'thin', color: { argb: 'FF000000' } }
        };
      });

      // Formatear datos
      const formattedData = formatDataForExcel(data, type);

      // Mantener definición original de columnas
      if (formattedData.length > 0) {
        worksheet.columns = Object.keys(formattedData[0]).map(key => ({
          header: key,
          key,
          width: 20
        }));
      }

      // Añadir datos con estilos
      formattedData.forEach((item, index) => {
        const row = worksheet.addRow(item);
        row.eachCell(cell => {
          cell.font = { 
            size: 11,
            name: 'Calibri',
            color: { argb: index % 2 === 0 ? 'FF2D3436' : 'FF636E72' }
          };
          cell.border = {
            bottom: { style: 'thin', color: { argb: 'FFECF0F1' } }
          };
        });
        
        // Fondo alternado para filas
        row.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: index % 2 === 0 ? 'FFF8F9FA' : 'FFFFFFFF' }
        };
      });

      // Formato condicional para montos
      if (type === 'financeItems') {
        worksheet.getColumn('Amount').numFmt = '"$"#,##0.00';
        worksheet.getColumn('Date').numFmt = 'dd/mm/yyyy';
      }

      // Congelar encabezado
      worksheet.views = [{ state: 'frozen', ySplit: 1 }];

      // Generar buffer
      workbook.xlsx.writeBuffer().then(resolve).catch(reject);
    } catch (err) {
      reject(err);
    }
  });
};
