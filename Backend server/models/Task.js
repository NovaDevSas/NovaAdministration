const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const evidenceSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  estimatedCompletionDate: {
    type: Date,
    required: true,
  },
  estimatedHours: {
    type: Number,
    required: true,
  },
  actualCompletionDate: {
    type: Date,
    required: false,
  },
  actualHours: {
    type: Number,
    required: false,
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium',
  },
  comments: [commentSchema],
  evidences: [evidenceSchema],
  description: {
    type: String,
    required: false,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
});

taskSchema.pre('save', function (next) {
  this.updatedDate = Date.now();
  next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;