# API de Autenticación con JWT

API RESTful de autenticación de usuarios utilizando JSON Web Tokens (JWT) y hashing de contraseñas con bcrypt.

## 🚀 Características

- ✅ Registro de usuarios con validación
- ✅ Autenticación mediante JWT
- ✅ Hashing de contraseñas con bcrypt
- ✅ Rutas protegidas con middleware de autenticación
- ✅ Manejo de errores robusto
- ✅ Base de datos en memoria (fácil de migrar a BD real)

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn
- Postman (para pruebas)

## 🔧 Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
   - El archivo `.env` ya está creado
   - **IMPORTANTE**: Cambiar `JWT_SECRET` en producción

3. Iniciar el servidor:
```bash
npm start
```

O para desarrollo con auto-reload:
```bash
npm run dev
```

El servidor se ejecutará en `http://localhost:3000`

## 📚 Endpoints de la API

### 1. Página de Inicio
- **GET** `/`
- Devuelve información sobre la API y sus endpoints
- **No requiere autenticación**

### 2. Registro de Usuario
- **POST** `/api/auth/register`
- **No requiere autenticación**

**Body (JSON):**
```json
{
  "username": "usuario1",
  "email": "usuario1@example.com",
  "password": "password123"
}
```

**Respuesta exitosa (201):**
```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": 2,
    "username": "usuario1",
    "email": "usuario1@example.com",
    "createdAt": "2025-11-04T..."
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Inicio de Sesión
- **POST** `/api/auth/login`
- **No requiere autenticación**

**Body (JSON):**
```json
{
  "email": "demo@example.com",
  "password": "password123"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "Inicio de sesión exitoso",
  "user": {
    "id": 1,
    "username": "demo",
    "email": "demo@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 4. Obtener Perfil (Ruta Protegida)
- **GET** `/api/users/profile`
- **Requiere autenticación** (Bearer Token)

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Respuesta exitosa (200):**
```json
{
  "user": {
    "id": 1,
    "username": "demo",
    "email": "demo@example.com",
    "createdAt": "2025-11-04T..."
  }
}
```

### 5. Obtener Todos los Usuarios (Ruta Protegida)
- **GET** `/api/users`
- **Requiere autenticación** (Bearer Token)

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Respuesta exitosa (200):**
```json
{
  "message": "Lista de usuarios",
  "count": 2,
  "users": [
    {
      "id": 1,
      "username": "demo",
      "email": "demo@example.com",
      "createdAt": "2025-11-04T..."
    }
  ]
}
```

## 🧪 Pruebas con Postman

### Usuario de Prueba Pre-registrado:
- **Email:** `demo@example.com`
- **Password:** `password123`

### Pasos para probar:

1. **Registrar nuevo usuario:**
   - Método: POST
   - URL: `http://localhost:3000/api/auth/register`
   - Body (raw JSON):
     ```json
     {
       "username": "testuser",
       "email": "test@example.com",
       "password": "password123"
     }
     ```
   - Copia el `token` de la respuesta

2. **Iniciar sesión:**
   - Método: POST
   - URL: `http://localhost:3000/api/auth/login`
   - Body (raw JSON):
     ```json
     {
       "email": "demo@example.com",
       "password": "password123"
     }
     ```
   - Copia el `token` de la respuesta

3. **Acceder a ruta protegida:**
   - Método: GET
   - URL: `http://localhost:3000/api/users/profile`
   - Headers:
     - Key: `Authorization`
     - Value: `Bearer TU_TOKEN_AQUI`

## 🔒 Seguridad

- ✅ Contraseñas hasheadas con bcrypt (salt rounds: 10)
- ✅ JWT con expiración configurable (24h por defecto)
- ✅ Validación de datos de entrada
- ✅ Contraseñas nunca se devuelven en las respuestas
- ✅ Protección contra usuarios duplicados

## 🗄️ Base de Datos

Actualmente usa una base de datos en memoria para demostración. Para producción, se puede migrar fácilmente a:
- MongoDB (con Mongoose)
- PostgreSQL (con Sequelize o Prisma)
- MySQL (con Sequelize)

## 📁 Estructura del Proyecto

```
JWT login/
├── config/
│   └── db.js                 # Base de datos simulada
├── controllers/
│   ├── authController.js     # Lógica de autenticación
│   └── userController.js     # Lógica de usuarios
├── middleware/
│   └── authMiddleware.js     # Middleware de autenticación JWT
├── routes/
│   ├── authRoutes.js         # Rutas de autenticación
│   └── userRoutes.js         # Rutas de usuarios
├── utils/
│   └── auth.js               # Utilidades de autenticación
├── .env                      # Variables de entorno
├── .gitignore
├── package.json
├── server.js                 # Punto de entrada
└── README.md
```

## 🎯 Códigos de Estado HTTP

- `200` - Éxito
- `201` - Recurso creado
- `400` - Solicitud incorrecta
- `401` - No autenticado
- `403` - Token inválido
- `404` - No encontrado
- `409` - Conflicto (usuario duplicado)
- `500` - Error del servidor

## 🚧 Próximas Mejoras

- [ ] Integración con base de datos real
- [ ] Refresh tokens
- [ ] Recuperación de contraseña
- [ ] Roles y permisos
- [ ] Rate limiting
- [ ] Logs de auditoría
- [ ] Interfaz gráfica (Frontend)

## 📝 Notas

- El token JWT expira en 24 horas por defecto
- La contraseña debe tener al menos 6 caracteres
- El formato de email es validado

## 👤 Autor

Proyecto de demostración para autenticación JWT

## 📄 Licencia

ISC
