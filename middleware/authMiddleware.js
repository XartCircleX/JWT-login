const authUtils = require('../utils/auth');
const db = require('../config/db');

/**
 * Middleware para proteger rutas con autenticación JWT
 */
const authenticateToken = (req, res, next) => {
  try {
    // Obtener token del header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ 
        message: 'Acceso denegado. No se proporcionó token de autenticación.' 
      });
    }

    // Verificar token
    const decoded = authUtils.verifyToken(token);
    
    // Verificar que el usuario todavía existe
    const user = db.findUserById(decoded.id);
    if (!user) {
      return res.status(401).json({ 
        message: 'Usuario no encontrado.' 
      });
    }

    // Agregar información del usuario a la request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username
    };

    next();
  } catch (error) {
    return res.status(403).json({ 
      message: 'Token inválido o expirado.',
      error: error.message 
    });
  }
};

module.exports = { authenticateToken };
