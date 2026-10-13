import mongoose from "mongoose";
import { catalog } from "./catalog";
import { readEnv } from "./config";
import { connectDb } from "./db";
import { Admin, Product } from "./models";

async function seed() {
  const env = readEnv();
  await connectDb(env.mongodbUri);

  for (const product of catalog) {
    await Product.findOneAndUpdate({ slug: product.slug }, product, { upsert: true, runValidators: true });
  }

  const admin = await Admin.findOne({ email: env.adminEmail.toLowerCase() });
  if (!admin) {
    await Admin.create({ email: env.adminEmail, password: env.adminPassword });
  }

  console.log(`Seeded ${catalog.length} products`);
  await mongoose.disconnect();
}

seed().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
