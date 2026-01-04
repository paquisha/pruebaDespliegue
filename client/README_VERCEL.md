# Configuración para Vercel - Cliente

## Variables de Entorno

Crea un archivo `.env.local` en esta carpeta (`client/`) para desarrollo local:

```env
VITE_API_URL=http://localhost:3001/api
```

**Importante**: Para producción en Vercel, configura esta variable en el Dashboard de Vercel:
- Ve a Settings → Environment Variables
- Agrega `VITE_API_URL` con la URL de tu backend desplegado
- Ejemplo: `https://tu-backend.railway.app/api`

## Despliegue Rápido

1. Asegúrate de que el código esté en un repositorio Git
2. Ve a [vercel.com](https://vercel.com) e importa el proyecto
3. **Configura importante**:
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Agrega la variable de entorno `VITE_API_URL`
5. Deploy!

Ver `GUIA_DESPLIEGUE_VERCEL.md` en la raíz del proyecto para más detalles.

