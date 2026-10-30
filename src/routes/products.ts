import { Readable } from "node:stream";
import { Router } from "express";
import multer from "multer";
import { z } from "zod";
import { requireAuth } from "../auth";
import { cloudinary } from "../cloudinary";
import { asyncRoute, HttpError } from "../http";
import { Product } from "../models";

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(_req, file, cb) {
    if (!ALLOWED_IMAGE_TYPES.has(file.mimetype)) {
      cb(new HttpError(400, "Image must be jpeg, png, or webp"));
      return;
    }
    cb(null, true);
  },
});

const locales = ["en", "fr", "ar"] as const;
type Locale = (typeof locales)[number];

const translationSchema = z.object({
  name: z.string().trim().min(1),
  material: z.string().trim().min(1),
  description: z.string().trim().min(1),
  label: z.string().trim().min(1).optional(),
});

const variantSchema = z.object({
  id: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Variant id must use lowercase letters, numbers, and hyphens"),
  color: z.string().trim().min(1),
  image: z.string().trim().url(),
  quantity: z.number().int().nonnegative(),
});

const productBody = z
  .object({
    slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must use lowercase letters, numbers, and hyphens"),
    category: z.enum(["Rings", "Necklaces", "Bracelets", "Watches"]),
    price: z.number().int().nonnegative(),
    position: z.number().int().nonnegative(),
    variants: z.array(variantSchema).min(1),
    translations: z.object({
      en: translationSchema,
      fr: translationSchema,
      ar: translationSchema,
    }),
  })
  .strict()
  .superRefine((body, ctx) => {
    const ids = body.variants.map((variant) => variant.id);
    if (new Set(ids).size !== ids.length) {
      ctx.addIssue({ code: "custom", message: "Variant ids must be unique within a product", path: ["variants"] });
    }
  });

type StoredTranslation = {
  name: string;
  material: string;
  description: string;
  label?: string | null;
};

type StoredVariant = {
  id: string;
  color: string;
  image: string;
  quantity: number;
};

type StoredProduct = {
  slug: string;
  category: string;
  price: number;
  position: number;
  variants?: StoredVariant[] | null;
  translations?: {
    en?: StoredTranslation | null;
    fr?: StoredTranslation | null;
    ar?: StoredTranslation | null;
  } | null;
};

function translation(product: StoredProduct, locale: Locale) {
  const text = product.translations?.[locale];
  if (!text?.name || !text.material || !text.description) {
    throw new HttpError(500, `Missing ${locale} translation for ${product.slug}`);
  }
  return text;
}

function presentVariants(product: StoredProduct) {
  if (!product.variants || product.variants.length === 0) {
    throw new HttpError(500, `Missing variants for ${product.slug}`);
  }
  return product.variants.map((variant) => ({
    id: variant.id,
    color: variant.color,
    image: variant.image,
    quantity: variant.quantity,
  }));
}

function presentProduct(product: StoredProduct, locale?: Locale) {
  const variants = presentVariants(product);
  if (!locale) {
    return {
      id: product.slug,
      category: product.category,
      price: product.price,
      position: product.position,
      variants,
      image: variants[0].image,
      quantity: variants.reduce((sum, variant) => sum + variant.quantity, 0),
      translations: {
        en: translation(product, "en"),
        fr: translation(product, "fr"),
        ar: translation(product, "ar"),
      },
    };
  }
  const text = translation(product, locale);
  return {
    id: product.slug,
    category: product.category,
    price: product.price,
    variants,
    image: variants[0].image,
    quantity: variants.reduce((sum, variant) => sum + variant.quantity, 0),
    name: text.name,
    material: text.material,
    description: text.description,
    label: text.label ?? undefined,
  };
}

function readLocale(value: unknown) {
  if (value === undefined) return undefined;
  if (value === "en" || value === "fr" || value === "ar") return value;
  throw new HttpError(400, "locale must be en, fr, or ar");
}

function uploadToCloudinary(buffer: Buffer) {
  return new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "cuties/products", resource_type: "image" },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        if (!result?.secure_url) {
          reject(new HttpError(500, "Cloudinary upload returned no URL"));
          return;
        }
        resolve({ secure_url: result.secure_url });
      },
    );
    Readable.from(buffer).pipe(stream);
  });
}

export function productRoutes(jwtSecret: string) {
  const router = Router();
  const staff = requireAuth(jwtSecret);

  router.get(
    "/",
    asyncRoute(async (req, res) => {
      const locale = readLocale(req.query.locale);
      const products = await Product.find().sort({ position: 1, slug: 1 });
      res.json(products.map((product) => presentProduct(product, locale)));
    }),
  );

  router.post(
    "/upload",
    staff,
    upload.single("file"),
    asyncRoute(async (req, res) => {
      if (!req.file) throw new HttpError(400, "Missing image file");
      const result = await uploadToCloudinary(req.file.buffer);
      res.status(201).json({ image: result.secure_url });
    }),
  );

  router.get(
    "/:slug",
    asyncRoute(async (req, res) => {
      const locale = readLocale(req.query.locale);
      const product = await Product.findOne({ slug: req.params.slug });
      if (!product) throw new HttpError(404, "Product not found");
      res.json(presentProduct(product, locale));
    }),
  );

  router.post(
    "/",
    staff,
    asyncRoute(async (req, res) => {
      const body = productBody.parse(req.body);
      const existing = await Product.findOne({ slug: body.slug });
      if (existing) throw new HttpError(409, "A product with this slug already exists");
      const product = await Product.create(body);
      res.status(201).json(presentProduct(product));
    }),
  );

  router.put(
    "/:slug",
    staff,
    asyncRoute(async (req, res) => {
      const body = productBody.parse(req.body);
      if (body.slug !== req.params.slug) throw new HttpError(400, "Slug in the body must match the URL");
      const product = await Product.findOneAndUpdate({ slug: req.params.slug }, body, {
        new: true,
        runValidators: true,
      });
      if (!product) throw new HttpError(404, "Product not found");
      res.json(presentProduct(product));
    }),
  );

  router.delete(
    "/:slug",
    staff,
    asyncRoute(async (req, res) => {
      const product = await Product.findOneAndDelete({ slug: req.params.slug });
      if (!product) throw new HttpError(404, "Product not found");
      res.status(204).end();
    }),
  );

  return router;
}
