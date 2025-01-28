const mongoose = require('mongoose');

const scheduledReportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    required: true,
  },
  reportType: {
    type: String,
    enum: ['income', 'expense', 'performance'],
    required: true,
  },
  format: {
    type: String,
    enum: ['pdf', 'excel'],
    required: true,
  },
  nextRun: {
    type: Date,
    required: true,
  },
});

const ScheduledReport = mongoose.model('ScheduledReport', scheduledReportSchema);

module.exports = ScheduledReport;