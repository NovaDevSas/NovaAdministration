const ScheduledReport = require('../models/ScheduledReport');
const User = require('../models/User');
const nodeSchedule = require('node-schedule');
const nodemailer = require('nodemailer');
const { exportToPDF, exportToExcel } = require('../utils/exportUtils'); // Asegúrate de tener estas funciones implementadas

// Crear una nueva configuración de reporte programado
const createScheduledReport = async (req, res) => {
  const { userId, frequency, reportType, format } = req.body;

  const nextRun = calculateNextRun(frequency);

  const scheduledReport = new ScheduledReport({
    userId,
    frequency,
    reportType,
    format,
    nextRun,
  });

  try {
    await scheduledReport.save();
    scheduleReport(scheduledReport);
    res.status(201).json(scheduledReport);
  } catch (err) {
    console.error('Error creating scheduled report:', err);
    res.status(400).json({ message: err.message });
  }
};

// Obtener todas las configuraciones de reportes programados
const getScheduledReports = async (req, res) => {
  try {
    const scheduledReports = await ScheduledReport.find().populate('userId', 'email');
    res.json(scheduledReports);
  } catch (err) {
    console.error('Error fetching scheduled reports:', err);
    res.status(500).json({ message: err.message });
  }
};

// Calcular la próxima ejecución del reporte
const calculateNextRun = (frequency) => {
  const now = new Date();
  switch (frequency) {
    case 'daily':
      return new Date(now.setDate(now.getDate() + 1));
    case 'weekly':
      return new Date(now.setDate(now.getDate() + 7));
    case 'monthly':
      return new Date(now.setMonth(now.getMonth() + 1));
    default:
      return now;
  }
};

// Programar el envío del reporte
const scheduleReport = (scheduledReport) => {
  console.log('Scheduling report:', scheduledReport);
  nodeSchedule.scheduleJob(scheduledReport.nextRun, async () => {
    const user = await User.findById(scheduledReport.userId);
    const reportData = await generateReportData(scheduledReport.reportType);

    let attachment;
    if (scheduledReport.format === 'pdf') {
      attachment = exportToPDF(reportData);
    } else {
      attachment = exportToExcel(reportData);
    }

    sendEmail(user.email, attachment, scheduledReport.format);

    // Actualizar la próxima ejecución
    scheduledReport.nextRun = calculateNextRun(scheduledReport.frequency);
    await scheduledReport.save();

    // Reprogramar la tarea
    scheduleReport(scheduledReport);
  });
};

// Generar los datos del reporte
const generateReportData = async (reportType) => {
  // Implementa la lógica para generar los datos del reporte según el tipo
  return {};
};

// Enviar el correo electrónico con el reporte adjunto
const sendEmail = (to, attachment, format) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Reporte Programado',
    text: 'Adjunto encontrarás tu reporte programado.',
    attachments: [
      {
        filename: `reporte.${format}`,
        content: attachment,
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
};

module.exports = {
  createScheduledReport,
  getScheduledReports,
  scheduleReport,
};