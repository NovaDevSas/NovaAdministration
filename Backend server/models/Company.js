const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['activa', 'inactiva', 'lead'], // Agregar 'lead' como un estado permitido
    required: true
  },
  code: {
    type: String,
    required: true
  },
  nit: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Company', companySchema);