// Base de datos simulada en memoria (para demostración)
// En producción, usar MongoDB, PostgreSQL, MySQL, etc.

const users = [
  // Usuario de prueba pre-registrado
  // Contraseña: "password123" (ya hasheada)
  {
    id: 1,
    username: 'demo',
    email: 'demo@example.com',
    password: '$2a$10$f1X3AS8TV5CDLn4FC2ZQxebPOeS/bMsbzs2PERkecvwxkLXfD..UG',
    createdAt: new Date()
  }
];

let nextId = 2;

const db = {
  users,
  
  // Obtener todos los usuarios
  getAllUsers() {
    return users.map(({ password, ...user }) => user); // Excluir password
  },
  
  // Buscar usuario por email
  findUserByEmail(email) {
    return users.find(user => user.email === email);
  },
  
  // Buscar usuario por username
  findUserByUsername(username) {
    return users.find(user => user.username === username);
  },
  
  // Buscar usuario por ID
  findUserById(id) {
    return users.find(user => user.id === id);
  },
  
  // Crear nuevo usuario
  createUser(userData) {
    const newUser = {
      id: nextId++,
      ...userData,
      createdAt: new Date()
    };
    users.push(newUser);
    return newUser;
  },
  
  // Verificar si email existe
  emailExists(email) {
    return users.some(user => user.email === email);
  },
  
  // Verificar si username existe
  usernameExists(username) {
    return users.some(user => user.username === username);
  }
};

module.exports = db;
