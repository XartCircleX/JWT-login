const db = require('../config/db');

const userController = {
  /**
   * Obtener perfil del usuario autenticado
   * GET /api/users/profile
   */
  getProfile(req, res) {
    try {
      const user = db.findUserById(req.user.id);
      
      if (!user) {
        return res.status(404).json({ 
          message: 'Usuario no encontrado' 
        });
      }

      // Responder sin incluir la contraseña
      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt
        }
      });
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      res.status(500).json({ 
        message: 'Error al obtener perfil',
        error: error.message 
      });
    }
  },

  /**
   * Obtener todos los usuarios (solo para demostración)
   * GET /api/users
   */
  getAllUsers(req, res) {
    try {
      const users = db.getAllUsers();
      
      res.json({
        message: 'Lista de usuarios',
        count: users.length,
        users
      });
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ 
        message: 'Error al obtener usuarios',
        error: error.message 
      });
    }
  }
};

module.exports = userController;
