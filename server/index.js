import express from "express";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

import indexRoutes from "./routes/index.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import { PORT } from "./config.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());

// Prefijo api para las rutas
app.use("/api", indexRoutes);
app.use("/api", taskRoutes);

// Servir archivos estáticos del cliente (solo en producción)
app.use(express.static(join(__dirname, "../client/dist")));

// Manejar rutas del cliente (SPA - React Router)
// Esta ruta debe ir al final, después de las rutas de API
app.get("*", (req, res, next) => {
  // Solo servir index.html para rutas que no sean de API y que no sean archivos estáticos
  if (!req.path.startsWith("/api")) {
    res.sendFile(join(__dirname, "../client/dist/index.html"));
  } else {
    next();
  }
});

// Iniciar el servidor
// En desarrollo y producción tradicional (Railway, Render, etc.) inicia el servidor
// En Vercel serverless functions, el servidor se maneja a través de server/api/index.js
const port = process.env.PORT || PORT || 3001;

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  });
}

// Exportar app para uso como módulo (útil para tests o serverless)
export default app;