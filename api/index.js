// Handler para Vercel Serverless Functions
import express from "express";
import cors from "cors";
import "dotenv/config";

// Importar rutas
import indexRoutes from "../server/routes/index.routes.js";
import taskRoutes from "../server/routes/tasks.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Montar las rutas con el prefijo /api
app.use("/api", indexRoutes);
app.use("/api", taskRoutes);

// Exportar como handler para Vercel
export default app;
