const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Crear un flujo de escritura (write stream) en modo de apéndice
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Configurar morgan para usar el flujo de escritura
const loggingMiddleware = morgan('combined', { stream: accessLogStream });

module.exports = loggingMiddleware;