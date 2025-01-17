const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const projectRoutes = require('./routes/projectRoutes');
const financeItemRoutes = require('./routes/financeItemRoutes');
const userRoutes = require('./routes/userRoutes');
const { swaggerUi, specs } = require('./config/swagger'); // Asegúrate de que la ruta sea correcta
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a la base de datos
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// Definir un formato personalizado para morgan
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/finance-items', financeItemRoutes);
app.use('/api/users', userRoutes);

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});