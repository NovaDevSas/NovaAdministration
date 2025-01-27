const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'processing', 'completed', 'inactive'],
    default: 'active',
  },
  budget: {
    type: Number,
    required: true,
  },
  port: {
    type: String,
    required: true,
  },
  host: {
    type: String,
    required: true,
  },
  subdomain: {
    type: String,
    required: true,
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  }],
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;