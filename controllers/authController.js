const authUtils = require('../utils/auth');
const db = require('../config/db');

const authController = {
  /**
   * Registrar nuevo usuario
   * POST /api/auth/register
   */
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      // Validar datos requeridos
      if (!username || !email || !password) {
        return res.status(400).json({ 
          message: 'Todos los campos son requeridos (username, email, password)' 
        });
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          message: 'Formato de email inválido' 
        });
      }

      // Validar longitud de contraseña
      if (password.length < 6) {
        return res.status(400).json({ 
          message: 'La contraseña debe tener al menos 6 caracteres' 
        });
      }

      // Verificar si el usuario ya existe
      if (db.emailExists(email)) {
        return res.status(409).json({ 
          message: 'El email ya está registrado' 
        });
      }

      if (db.usernameExists(username)) {
        return res.status(409).json({ 
          message: 'El nombre de usuario ya está en uso' 
        });
      }

      // Hashear contraseña
      const hashedPassword = await authUtils.hashPassword(password);

      // Crear usuario
      const newUser = db.createUser({
        username,
        email,
        password: hashedPassword
      });

      // Generar token
      const token = authUtils.generateToken({
        id: newUser.id,
        email: newUser.email,
        username: newUser.username
      });

      // Responder (sin incluir la contraseña)
      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          createdAt: newUser.createdAt
        },
        token
      });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ 
        message: 'Error al registrar usuario',
        error: error.message 
      });
    }
  },

  /**
   * Iniciar sesión
   * POST /api/auth/login
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validar datos requeridos
      if (!email || !password) {
        return res.status(400).json({ 
          message: 'Email y contraseña son requeridos' 
        });
      }

      // Buscar usuario
      const user = db.findUserByEmail(email);
      if (!user) {
        return res.status(401).json({ 
          message: 'Credenciales inválidas' 
        });
      }

      // Verificar contraseña
      const isValidPassword = await authUtils.comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ 
          message: 'Credenciales inválidas' 
        });
      }

      // Generar token
      const token = authUtils.generateToken({
        id: user.id,
        email: user.email,
        username: user.username
      });

      // Responder
      res.json({
        message: 'Inicio de sesión exitoso',
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        },
        token
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ 
        message: 'Error al iniciar sesión',
        error: error.message 
      });
    }
  }
};

module.exports = authController;
