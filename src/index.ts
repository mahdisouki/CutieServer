import "./types";
import { createApp } from "./app";
import { configureCloudinary } from "./cloudinary";
import { readEnv } from "./config";
import { connectDb } from "./db";

async function main() {
  const env = readEnv();
  configureCloudinary(env);
  await connectDb(env.mongodbUri);
  const app = createApp(env);
  app.listen(env.port, "0.0.0.0", () => {
    console.log(`Cuties API listening on ${env.port}`);
  });
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
