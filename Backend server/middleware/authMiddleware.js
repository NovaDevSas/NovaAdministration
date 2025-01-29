const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  if (!token) {
    return res.status(401).json({ message: 'No autorizado, token ausente' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Información del usuario decodificada
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token no válido' });
  }
};

module.exports = { protect };
