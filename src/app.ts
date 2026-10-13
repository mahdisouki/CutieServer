import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import type { Env } from "./config";
import { errorHandler } from "./http";
import { authRoutes } from "./routes/auth";
import { orderRoutes } from "./routes/orders";
import { productRoutes } from "./routes/products";

export function createApp(env: Env) {
  const app = express();
  app.disable("x-powered-by");
  app.use(cors({ origin: env.allowedOrigins }));
  app.use(express.json({ limit: "1mb" }));

  app.get("/api/health", (_req, res) => {
    if (mongoose.connection.readyState !== 1) {
      res.status(500).json({ ok: false, error: "Database is not connected" });
      return;
    }
    res.json({ ok: true });
  });

  app.use("/api/auth", authRoutes(env.jwtSecret));
  app.use("/api/products", productRoutes(env.jwtSecret));
  app.use("/api/orders", orderRoutes(env.jwtSecret));

  app.use((_req, res) => {
    res.status(404).json({ error: "Route not found" });
  });
  app.use(errorHandler);
  return app;
}
