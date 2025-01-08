const mongoose = require('mongoose');

const financeItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['expense', 'income'],
    required: true
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  frequency: {
    type: String,
    enum: ['one-time', 'monthly', 'quarterly', 'yearly'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    required: true
  },
  discounts: {
    type: Number,
    required: false
  },
  costs: {
    type: Number,
    required: false
  },
  income: {
    type: Number,
    required: false
  }
});

module.exports = mongoose.model('FinanceItem', financeItemSchema);