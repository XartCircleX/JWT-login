# API de Autenticación con JWT

API RESTful de autenticación de usuarios utilizando JSON Web Tokens (JWT) y hashing de contraseñas con bcrypt.

## Requisitos Previos

- Node.js
- npm o yarn
- Postman

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
   - Crear un archivo .env con las siguientes variables:
```bash
    JWT_SECRET=replace_with_a_strong_secret
    JWT_EXPIRES_IN=24h
    PORT=3000
```
3. Iniciar el servidor:

```bash
npm run dev
```

El servidor se ejecutará en `http://localhost:3000`

## Endpoints de la API

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

## Pruebas con Postman

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

## Base de Datos

Actualmente usa una base de datos en memoria para demostración.
