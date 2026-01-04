# Guía de Despliegue en Vercel

Esta guía te ayudará a desplegar tu aplicación frontend en Vercel y conectarla con tu backend.

## 📋 Requisitos Previos

1. Cuenta en [Vercel](https://vercel.com) (gratuita)
2. Cuenta en GitHub, GitLab o Bitbucket
3. Backend desplegado (Railway, Render, etc.)
4. Base de datos MySQL configurada

## 🚀 Opción 1: Desplegar Frontend en Vercel (Recomendado)

### Paso 1: Preparar el Proyecto

1. **Asegúrate de que tu código esté en un repositorio Git:**
```bash
git init
git add .
git commit -m "Preparando para despliegue"
git remote add origin <tu-repositorio-url>
git push -u origin main
```

### Paso 2: Configurar Variables de Entorno

El archivo `client/src/api/tasks.api.js` ya está configurado para usar la variable de entorno `VITE_API_URL`.

Necesitarás configurar esta variable en Vercel con la URL de tu backend desplegado.

### Paso 3: Desplegar en Vercel

#### Método A: Desde el Dashboard de Vercel (Recomendado para principiantes)

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Haz clic en **"Add New Project"** o **"Import Project"**
3. Conecta tu repositorio de GitHub/GitLab/Bitbucket
4. Configura el proyecto:
   - **Framework Preset**: Vite
   - **Root Directory**: `client` (importante: selecciona la carpeta client)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Variables de Entorno:**
   - Haz clic en **"Environment Variables"**
   - Agrega:
     - **Key**: `VITE_API_URL`
     - **Value**: `https://tu-backend-url.railway.app/api` (o la URL de tu backend)
     - Selecciona los ambientes: Production, Preview, Development

6. Haz clic en **"Deploy"**

#### Método B: Desde la CLI de Vercel

1. **Instala Vercel CLI:**
```bash
npm i -g vercel
```

2. **Inicia sesión:**
```bash
vercel login
```

3. **Navega a la carpeta del cliente:**
```bash
cd client
```

4. **Despliega:**
```bash
vercel
```

5. **Sigue las instrucciones:**
   - ¿Set up and deploy? → **Y**
   - ¿Which scope? → Selecciona tu cuenta
   - ¿Link to existing project? → **N** (primera vez)
   - ¿What's your project's name? → Nombre del proyecto
   - ¿In which directory is your code located? → **./**
   - Override settings? → **N**

6. **Configura variables de entorno:**
```bash
vercel env add VITE_API_URL
# Ingresa la URL de tu backend cuando se solicite
```

7. **Para producción:**
```bash
vercel --prod
```

### Paso 4: Actualizar Variables de Entorno Después del Despliegue

Si necesitas actualizar variables de entorno después del primer despliegue:

1. Ve a tu proyecto en Vercel Dashboard
2. Ve a **Settings** → **Environment Variables**
3. Edita o agrega variables
4. Ve a **Deployments** y haz redeploy del último deployment

## 🔧 Configuración del Backend

Tu backend debe estar desplegado y accesible públicamente. Asegúrate de:

1. **CORS configurado correctamente:**
   - El backend debe aceptar requests desde tu dominio de Vercel
   - Actualiza `server/api/index.js` si es necesario:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173', // Desarrollo local
    'https://tu-app.vercel.app' // Tu dominio de Vercel
  ]
}));
```

2. **Variables de entorno del backend:**
   - Asegúrate de que tu backend tenga las variables de entorno configuradas:
     - `DB_HOST`
     - `DB_PORT`
     - `DB_USER`
     - `DB_PASSWORD`
     - `DB_NAME`

## 🌐 URLs y Dominios

Después del despliegue, Vercel te proporcionará:

- **URL de producción**: `https://tu-proyecto.vercel.app`
- **URLs de preview**: Para cada pull request

Puedes configurar un dominio personalizado desde:
**Settings** → **Domains**

## 🔄 Despliegues Automáticos

Vercel desplegará automáticamente cuando:
- Haces push a la rama principal (producción)
- Creas un pull request (preview)
- Haces push a otras ramas (preview)

## 📝 Verificación Post-Despliegue

1. Visita la URL de tu aplicación en Vercel
2. Verifica que la aplicación carga correctamente
3. Prueba crear, editar y eliminar tareas
4. Revisa la consola del navegador por errores
5. Verifica las Network requests en DevTools

## 🐛 Solución de Problemas

### Error: "Failed to fetch" o CORS

- Verifica que la URL del backend en `VITE_API_URL` sea correcta
- Asegúrate de que el backend tenga CORS configurado para tu dominio de Vercel
- Verifica que el backend esté funcionando y accesible

### Error: Variables de entorno no funcionan

- Las variables de entorno en Vite deben empezar con `VITE_`
- Después de agregar variables, necesitas redeploy
- Verifica que las variables estén configuradas para el ambiente correcto (Production/Preview/Development)

### Error: 404 en rutas

- Verifica que `vercel.json` tenga la configuración de rewrites correcta
- Asegúrate de que el `outputDirectory` sea `dist`

### Error: Build falla

- Verifica los logs de build en Vercel Dashboard
- Asegúrate de que todas las dependencias estén en `package.json`
- Verifica que el `Root Directory` esté configurado como `client`

## 📚 Recursos Adicionales

- [Documentación de Vercel](https://vercel.com/docs)
- [Documentación de Vite](https://vitejs.dev/guide/)
- [Variables de Entorno en Vite](https://vitejs.dev/guide/env-and-mode.html)

## 🔐 Mejores Prácticas

1. **No commitees archivos `.env`** - Usa `.env.example`
2. **Usa diferentes URLs para desarrollo y producción**
3. **Configura CORS apropiadamente en el backend**
4. **Usa variables de entorno para todas las configuraciones sensibles**
5. **Monitorea los logs de Vercel regularmente**

---

**Nota**: Esta guía asume que estás desplegando solo el frontend en Vercel. Si también quieres desplegar el backend en Vercel (usando Serverless Functions), será necesario refactorizar el código del backend, lo cual es más complejo.

