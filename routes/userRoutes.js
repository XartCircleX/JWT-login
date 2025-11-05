const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Todas las rutas de usuarios requieren autenticación
router.use(authenticateToken);

// GET /api/users/profile - Obtener perfil del usuario autenticado
router.get('/profile', userController.getProfile);

// GET /api/users - Obtener todos los usuarios
router.get('/', userController.getAllUsers);

module.exports = router;
