# Documentación Técnica - Sistema de Gestión de Tareas

## 1. Información General

### 1.1 Descripción
Aplicación web full-stack para la gestión de tareas (To-Do List) desarrollada con el stack MERN (MySQL, Express, React, Node.js). Permite crear, leer, actualizar y eliminar tareas, así como marcar su estado de completado.

### 1.2 Stack Tecnológico

**Backend:**
- Node.js (ES Modules)
- Express.js 4.18.1
- MySQL2 2.3.3
- CORS 2.8.5
- Morgan 1.10.0 (middleware de logging)

**Frontend:**
- React 18.2.0
- React Router DOM 6.3.0
- Vite 3.0.0 (build tool)
- Axios 0.27.2
- Formik 2.2.9
- TailwindCSS 3.1.6

**Base de Datos:**
- MySQL 8.0+

---

## 2. Arquitectura del Sistema

### 2.1 Estructura del Proyecto

```
pruebaDespliegue/
├── client/                 # Aplicación React (Frontend)
│   ├── src/
│   │   ├── api/           # Servicios API
│   │   ├── components/    # Componentes reutilizables
│   │   ├── context/       # Context API de React
│   │   ├── pages/         # Páginas/Vistas
│   │   ├── App.jsx        # Componente principal
│   │   └── main.jsx       # Punto de entrada
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Servidor Express (Backend)
│   ├── config.js          # Configuración
│   ├── db.js              # Conexión a MySQL
│   ├── index.js           # Servidor principal
│   ├── controllers/       # Lógica de negocio
│   └── routes/            # Rutas de la API
│
├── database/
│   └── db.sql             # Script de creación de BD
│
└── package.json           # Dependencias del servidor
```

### 2.2 Patrón Arquitectónico
- **Frontend**: Arquitectura basada en componentes con Context API para estado global
- **Backend**: Arquitectura MVC (Modelo-Vista-Controlador)
- **Comunicación**: REST API entre cliente y servidor

---

## 3. Backend (Servidor)

### 3.1 Configuración

**Archivo: `server/config.js`**
```javascript
export const PORT = 3001;
```

**Archivo: `server/db.js`**
- Configuración del pool de conexiones MySQL
- Host: localhost
- Puerto: 3306
- Base de datos: tasksdb
- Usuario: root
- Password: 1234567890

### 3.2 Servidor Principal

**Archivo: `server/index.js`**
- Configuración de Express
- Middlewares: CORS, express.json()
- Servicio de archivos estáticos para el cliente
- Rutas de la API
- Puerto: 3001

### 3.3 Base de Datos

**Esquema de la tabla `tasks`:**

```sql
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(300),
    done BOOLEAN NOT NULL DEFAULT 0,
    createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

**Campos:**
- `id`: Identificador único (autoincremental)
- `title`: Título de la tarea (máximo 200 caracteres, obligatorio)
- `description`: Descripción de la tarea (máximo 300 caracteres, opcional)
- `done`: Estado de completado (0 = no completada, 1 = completada)
- `createAt`: Fecha y hora de creación (se asigna automáticamente)

### 3.4 Rutas de la API

**Base URL:** `http://localhost:3001`

#### 3.4.1 Ruta de Prueba
- **GET** `/ping`
  - Descripción: Endpoint de prueba de conectividad con la base de datos
  - Respuesta: `{ result: 2 }`

#### 3.4.2 Rutas de Tareas

**GET `/tasks`**
- Descripción: Obtiene todas las tareas ordenadas por fecha de creación (ASC)
- Respuesta: Array de objetos de tareas
- Códigos de estado: 200 (éxito), 500 (error del servidor)

**GET `/tasks/:id`**
- Descripción: Obtiene una tarea específica por ID
- Parámetros: `id` (URL parameter)
- Respuesta: Objeto de tarea
- Códigos de estado: 200 (éxito), 404 (no encontrada), 500 (error)

**POST `/tasks`**
- Descripción: Crea una nueva tarea
- Body: `{ title: string, description: string }`
- Respuesta: Objeto con id, title y description de la tarea creada
- Códigos de estado: 200 (éxito), 500 (error)

**PUT `/tasks/:id`**
- Descripción: Actualiza una tarea existente
- Parámetros: `id` (URL parameter)
- Body: Objeto con los campos a actualizar (title, description, done)
- Respuesta: Resultado de la actualización
- Códigos de estado: 200 (éxito), 500 (error)

**DELETE `/tasks/:id`**
- Descripción: Elimina una tarea por ID
- Parámetros: `id` (URL parameter)
- Respuesta: Sin contenido
- Códigos de estado: 204 (éxito), 404 (no encontrada), 500 (error)

### 3.5 Controladores

**Archivo: `server/controllers/tasks.controllers.js`**

Funciones exportadas:
- `getTasks()`: Obtiene todas las tareas
- `getTask(req, res)`: Obtiene una tarea por ID
- `createTask(req, res)`: Crea una nueva tarea
- `updateTask(req, res)`: Actualiza una tarea
- `deleteTask(req, res)`: Elimina una tarea

Todas las funciones manejan errores y retornan respuestas JSON apropiadas.

---

## 4. Frontend (Cliente)

### 4.1 Configuración

- **Build Tool**: Vite 3.0.0
- **Puerto de desarrollo**: 5173 (por defecto de Vite)
- **Framework UI**: TailwindCSS 3.1.6
- **Enrutamiento**: React Router DOM 6.3.0

### 4.2 Estructura de Componentes

#### 4.2.1 Componente Principal
**Archivo: `client/src/App.jsx`**
- Configura las rutas de la aplicación
- Envuelve la aplicación con `TaskContextProvider`
- Incluye el componente `Navbar`

#### 4.2.2 Páginas

**TasksPage (`/`)**
- Muestra todas las tareas en un grid de 3 columnas
- Carga las tareas al montar el componente
- Muestra mensaje si no hay tareas

**TaskForm (`/new` y `/edit/:id`)**
- Formulario para crear/editar tareas
- Usa Formik para manejo de formularios
- Campos: title (text), description (textarea)
- Redirige a `/` después de guardar

**NotFound (`*`)**
- Página 404 para rutas no encontradas

#### 4.2.3 Componentes

**Navbar**
- Barra de navegación de la aplicación

**TaskCard**
- Tarjeta que muestra información de una tarea
- Muestra: título, descripción, fecha de creación, estado (✅/❌)
- Botones: Delete, Edit, Toggle Task
- Navega a `/edit/:id` para editar

### 4.3 Estado Global (Context API)

**Archivo: `client/src/context/TaskProvider.jsx`**

**Estado:**
- `tasks`: Array de tareas

**Funciones:**
- `loadTasks()`: Carga todas las tareas desde el servidor
- `deleteTask(id)`: Elimina una tarea
- `createTask(task)`: Crea una nueva tarea
- `getTask(id)`: Obtiene una tarea por ID
- `updateTask(id, newFields)`: Actualiza una tarea
- `toggleTaskDone(id)`: Cambia el estado de completado de una tarea

**Hook personalizado:**
- `useTasks()`: Hook para acceder al contexto de tareas

### 4.4 Servicios API

**Archivo: `client/src/api/tasks.api.js`**

Funciones que realizan peticiones HTTP usando Axios:

- `getTasksRequest()`: GET `/tasks`
- `createTaskRequest(task)`: POST `/tasks`
- `deleteTaskRequest(id)`: DELETE `/tasks/:id`
- `getTaskRequest(id)`: GET `/tasks/:id`
- `updateTaskRequest(id, newFields)`: PUT `/tasks/:id`
- `toggleTaskDoneRequest(id, done)`: PUT `/tasks/:id`

**Base URL:** `http://localhost:3001`

---

## 5. Instalación y Configuración

### 5.1 Requisitos Previos

- Node.js (v14 o superior)
- MySQL 8.0+
- npm o yarn

### 5.2 Instalación

1. **Clonar el repositorio** (si aplica)

2. **Instalar dependencias del servidor:**
```bash
npm install
```

3. **Instalar dependencias del cliente:**
```bash
cd client
npm install
cd ..
```

4. **Configurar la base de datos:**
   - Crear la base de datos `tasksdb` en MySQL
   - Ejecutar el script `database/db.sql` para crear la tabla
   - Actualizar las credenciales en `server/db.js` si es necesario

### 5.3 Configuración de la Base de Datos

Editar `server/db.js` con tus credenciales:

```javascript
export const pool = createPool({
    host: 'localhost',
    port: 3306,
    user: 'tu_usuario',
    password: 'tu_contraseña',
    database: 'tasksdb'
})
```

### 5.4 Ejecución

**Modo desarrollo:**

1. **Servidor:**
```bash
npm run dev
```
El servidor se ejecutará en `http://localhost:3001`

2. **Cliente (en otra terminal):**
```bash
cd client
npm run dev
```
El cliente se ejecutará en `http://localhost:5173`

**Modo producción:**

1. **Compilar el cliente:**
```bash
cd client
npm run build
```

2. **Ejecutar el servidor:**
```bash
npm start
```

El servidor servirá la aplicación compilada desde `client/dist`.

---

## 6. Flujo de Datos

### 6.1 Crear una Tarea

1. Usuario completa el formulario en `/new`
2. Formik valida y envía los datos
3. `TaskProvider.createTask()` llama a `createTaskRequest()`
4. Axios realiza POST a `http://localhost:3001/tasks`
5. El controlador `createTask` inserta en MySQL
6. El servidor retorna la tarea creada
7. El usuario es redirigido a `/` (página principal)

### 6.2 Cargar Tareas

1. Al montar `TasksPage`, se llama a `loadTasks()`
2. `getTasksRequest()` realiza GET a `/tasks`
3. El servidor consulta todas las tareas de MySQL
4. Las tareas se almacenan en el estado `tasks` del contexto
5. `TasksPage` renderiza las tareas usando `TaskCard`

### 6.3 Actualizar Estado de Tarea

1. Usuario hace clic en "Toggle Task" en `TaskCard`
2. Se llama a `toggleTaskDone(id)`
3. Se encuentra la tarea actual y se invierte el estado `done`
4. `toggleTaskDoneRequest()` realiza PUT a `/tasks/:id` con el nuevo estado
5. El estado local se actualiza optimísticamente
6. El servidor actualiza el registro en MySQL

---

## 7. Seguridad

### 7.1 Consideraciones Actuales

- **CORS**: Habilitado para desarrollo local
- **Validación**: Validación básica en el backend
- **SQL Injection**: Uso de parámetros preparados (mysql2/promise)

### 7.2 Recomendaciones para Producción

1. **Variables de entorno**: Mover credenciales de BD a variables de entorno
2. **Autenticación**: Implementar sistema de autenticación (JWT, OAuth, etc.)
3. **Validación**: Añadir validación más robusta (Joi, express-validator)
4. **Rate Limiting**: Implementar límites de tasa de peticiones
5. **HTTPS**: Usar certificados SSL/TLS
6. **Sanitización**: Sanitizar inputs del usuario
7. **Error Handling**: Mejorar manejo de errores sin exponer información sensible

---

## 8. Mejoras Futuras

1. **Autenticación y Autorización**: Sistema de usuarios y permisos
2. **Categorías/Etiquetas**: Organización de tareas por categorías
3. **Filtros y Búsqueda**: Filtrar tareas por estado, fecha, etc.
4. **Drag and Drop**: Reordenar tareas mediante arrastre
5. **Notificaciones**: Alertas para tareas importantes
6. **Modo Oscuro/Claro**: Toggle de tema
7. **Responsive Design**: Mejorar diseño para móviles
8. **Tests**: Implementar tests unitarios e integración
9. **Paginación**: Para listas largas de tareas
10. **Exportación**: Exportar tareas a CSV/JSON

---

## 9. Scripts Disponibles

### Servidor (raíz)
- `npm run dev`: Ejecuta el servidor en modo desarrollo (nodemon)
- `npm start`: Ejecuta el servidor en modo producción

### Cliente (directorio `client`)
- `npm run dev`: Inicia servidor de desarrollo Vite
- `npm run build`: Compila la aplicación para producción
- `npm run preview`: Previsualiza la build de producción

---

## 10. Contacto y Soporte

Para más información o soporte técnico, contactar al equipo de desarrollo.

---

**Última actualización:** 2024
**Versión del proyecto:** 1.0.0