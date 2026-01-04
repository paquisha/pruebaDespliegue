# Guía de Despliegue Completo en Vercel

Esta guía te ayudará a desplegar tanto el frontend como el backend en Vercel usando `vercel.json`.

## 📋 Estructura del Proyecto

Tu proyecto ahora tiene la siguiente estructura optimizada para Vercel:

```
pruebaDespliegue/
├── api/
│   └── index.js          # Handler para Vercel Serverless Functions
├── client/               # Frontend React + Vite
├── server/               # Backend Express
├── vercel.json          # Configuración de Vercel
└── .vercelignore        # Archivos a ignorar en el despliegue
```

## 🚀 Pasos para Desplegar

### Paso 1: Preparar el Repositorio

1. **Asegúrate de que todo esté commitado:**
```bash
git add .
git commit -m "Configuración para Vercel"
git push
```

### Paso 2: Configurar Variables de Entorno en Vercel

Antes de desplegar, necesitas configurar las variables de entorno en Vercel:

#### Variables del Backend (Base de Datos):
- `DB_HOST` - Host de tu base de datos MySQL
- `DB_PORT` - Puerto de tu base de datos (ej: 48909)
- `DB_USER` - Usuario de la base de datos
- `DB_PASSWORD` - Contraseña de la base de datos
- `DB_NAME` - Nombre de la base de datos

#### Variables del Frontend:
- `VITE_API_URL` - URL de tu API (si el backend está en el mismo dominio, usa `/api`)

### Paso 3: Desplegar en Vercel

#### Opción A: Desde el Dashboard (Recomendado)

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Haz clic en **"Add New Project"** o **"Import Project"**
3. Conecta tu repositorio de GitHub/GitLab/Bitbucket
4. **Configura el proyecto:**
   - **Framework Preset**: Otro (o deja en blanco)
   - **Root Directory**: `.` (raíz del proyecto)
   - **Build Command**: `cd client && npm install && npm run build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `npm install && cd client && npm install`

5. **Agrega las Variables de Entorno:**
   - Haz clic en **"Environment Variables"**
   - Agrega todas las variables mencionadas arriba
   - Selecciona los ambientes: Production, Preview, Development

6. Haz clic en **"Deploy"**

#### Opción B: Desde la CLI

1. **Instala Vercel CLI:**
```bash
npm i -g vercel
```

2. **Inicia sesión:**
```bash
vercel login
```

3. **En la raíz del proyecto, despliega:**
```bash
vercel
```

4. **Sigue las instrucciones:**
   - ¿Set up and deploy? → **Y**
   - ¿Which scope? → Selecciona tu cuenta
   - ¿Link to existing project? → **N** (primera vez)
   - ¿What's your project's name? → Nombre del proyecto
   - ¿In which directory is your code located? → **./**
   - Override settings? → **N**

5. **Configura variables de entorno:**
```bash
vercel env add DB_HOST
vercel env add DB_PORT
vercel env add DB_USER
vercel env add DB_PASSWORD
vercel env add DB_NAME
vercel env add VITE_API_URL
```

6. **Para producción:**
```bash
vercel --prod
```

## 🔧 Cómo Funciona

### Frontend
- Se construye usando `cd client && npm run build`
- Los archivos estáticos se sirven desde `client/dist`
- Las rutas de React Router se manejan con rewrites en `vercel.json`

### Backend (Serverless Functions)
- El archivo `api/index.js` se ejecuta como serverless function
- Todas las rutas que empiezan con `/api` van a esta función
- Vercel maneja automáticamente el escalado y la infraestructura

### Routing
- `/api/*` → Serverless function (`api/index.js`)
- `/*.js`, `/*.css`, etc. → Archivos estáticos del build
- Cualquier otra ruta → `index.html` (SPA routing)

## 🌐 URLs y Dominios

Después del despliegue, Vercel te proporcionará:
- **URL de producción**: `https://tu-proyecto.vercel.app`
- **API**: `https://tu-proyecto.vercel.app/api/...`
- **Frontend**: `https://tu-proyecto.vercel.app/`

Puedes configurar un dominio personalizado desde:
**Settings** → **Domains**

## ⚙️ Configuración de Variables de Entorno

### Para Desarrollo Local

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de datos
DB_HOST=nozomi.proxy.rlwy.net
DB_PORT=48909
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=railway

# API URL (para el cliente)
VITE_API_URL=http://localhost:3001/api
```

Y otro `.env.local` en `client/`:

```env
VITE_API_URL=http://localhost:3001/api
```

### Para Vercel

Configura las mismas variables en el Dashboard de Vercel:
- **Settings** → **Environment Variables**
- Para `VITE_API_URL` en producción, usa: `/api` (ruta relativa) o la URL completa de tu API

## 🔄 Despliegues Automáticos

Vercel desplegará automáticamente cuando:
- Haces push a la rama principal (producción)
- Creas un pull request (preview)
- Haces push a otras ramas (preview)

## 📝 Verificación Post-Despliegue

1. Visita la URL de tu aplicación
2. Prueba el endpoint de ping: `https://tu-proyecto.vercel.app/api/ping`
3. Verifica que la aplicación carga correctamente
4. Prueba crear, editar y eliminar tareas
5. Revisa la consola del navegador por errores
6. Revisa los logs en Vercel Dashboard → **Deployments** → **Functions**

## 🐛 Solución de Problemas

### Error: "Cannot find module"

- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que el `Install Command` instale tanto las dependencias del root como del client

### Error: "Function invocation failed"

- Revisa los logs en Vercel Dashboard → **Deployments** → **Functions**
- Verifica que las variables de entorno estén configuradas correctamente
- Asegúrate de que la conexión a la base de datos sea accesible desde Vercel

### Error: CORS

- El backend ya tiene CORS configurado para aceptar todos los orígenes
- Si necesitas restringir, modifica `api/index.js`

### Error: Rutas no funcionan

- Verifica que `vercel.json` tenga la configuración correcta
- Asegúrate de que las rutas en el frontend apunten a `/api` (ruta relativa)

### Error: Build falla

- Revisa los logs de build en Vercel Dashboard
- Verifica que el `Build Command` y `Output Directory` sean correctos
- Asegúrate de que el cliente se construya correctamente localmente primero

## 🔐 Mejores Prácticas

1. **Nunca commitees credenciales**: Usa variables de entorno siempre
2. **Usa diferentes entornos**: Configura variables para Production, Preview y Development
3. **Monitorea los logs**: Revisa regularmente los logs de funciones en Vercel
4. **Prueba localmente primero**: Asegúrate de que todo funcione localmente antes de desplegar
5. **Usa dominios personalizados**: Para producción, configura un dominio personalizado

## 📚 Archivos de Configuración

### vercel.json
Configura los builds, rutas y rewrites del proyecto.

### api/index.js
Handler para las serverless functions de Vercel. Este archivo se ejecuta cuando alguien accede a `/api/*`.

### .vercelignore
Especifica qué archivos ignorar durante el despliegue (similar a .gitignore).

## 🔗 Recursos Adicionales

- [Documentación de Vercel](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Variables de Entorno en Vercel](https://vercel.com/docs/environment-variables)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)

---

**Nota**: Esta configuración desplegará tanto el frontend como el backend en Vercel. El backend se ejecutará como serverless functions, lo que significa que se activará bajo demanda y puede tener "cold starts" en la primera invocación.

