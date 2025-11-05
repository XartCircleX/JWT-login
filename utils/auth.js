const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authUtils = {
  /**
   * Hashear contraseña usando bcrypt
   * @param {string} password - Contraseña en texto plano
   * @returns {Promise<string>} Contraseña hasheada
   */
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  },

  /**
   * Comparar contraseña con hash
   * @param {string} password - Contraseña en texto plano
   * @param {string} hashedPassword - Contraseña hasheada
   * @returns {Promise<boolean>} True si coinciden
   */
  async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  },

  /**
   * Generar JWT token
   * @param {object} payload - Datos a incluir en el token
   * @returns {string} JWT token
   */
  generateToken(payload) {
    return jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
  },

  /**
   * Verificar JWT token
   * @param {string} token - JWT token
   * @returns {object} Payload decodificado
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }
};

module.exports = authUtils;
