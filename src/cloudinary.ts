import { v2 as cloudinary } from "cloudinary";
import type { Env } from "./config";

export function configureCloudinary(env: Env) {
  cloudinary.config({
    cloud_name: env.cloudinaryCloudName,
    api_key: env.cloudinaryApiKey,
    api_secret: env.cloudinaryApiSecret,
    secure: true,
  });
  return cloudinary;
}

export { cloudinary };
