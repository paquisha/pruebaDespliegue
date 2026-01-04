// Handler para Vercel Serverless Functions
// Vercel ya maneja el prefijo /api, así que necesitamos una versión adaptada
import express from "express";
import cors from "cors";
import "dotenv/config";

// Importar rutas (sin prefijo /api ya que Vercel lo maneja)
import indexRoutes from "../server/routes/index.routes.js";
import taskRoutes from "../server/routes/tasks.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Montar las rutas SIN el prefijo /api (Vercel ya lo maneja en el routing)
app.use("/", indexRoutes);
app.use("/", taskRoutes);

export default app;
