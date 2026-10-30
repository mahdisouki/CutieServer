import dotenv from "dotenv";

dotenv.config();

export type Env = {
  port: number;
  mongodbUri: string;
  jwtSecret: string;
  adminEmail: string;
  adminPassword: string;
  allowedOrigins: string[];
  cloudinaryCloudName: string;
  cloudinaryApiKey: string;
  cloudinaryApiSecret: string;
};

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable ${name}`);
  return value;
}

export function readEnv(): Env {
  const port = Number(process.env.PORT ?? "3000");
  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("PORT must be a positive integer");
  }

  const allowedOrigins = requireEnv("ALLOWED_ORIGINS")
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
  if (allowedOrigins.length === 0) throw new Error("ALLOWED_ORIGINS is empty");

  return {
    port,
    mongodbUri: requireEnv("MONGODB_URI"),
    jwtSecret: requireEnv("JWT_SECRET"),
    adminEmail: requireEnv("ADMIN_EMAIL"),
    adminPassword: requireEnv("ADMIN_PASSWORD"),
    allowedOrigins,
    cloudinaryCloudName: requireEnv("CLOUDINARY_CLOUD_NAME"),
    cloudinaryApiKey: requireEnv("CLOUDINARY_API_KEY"),
    cloudinaryApiSecret: requireEnv("CLOUDINARY_API_SECRET"),
  };
}
