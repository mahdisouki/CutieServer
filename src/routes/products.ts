import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../auth";
import { asyncRoute, HttpError } from "../http";
import { Product } from "../models";

const locales = ["en", "fr", "ar"] as const;
type Locale = (typeof locales)[number];

const translationSchema = z.object({
  name: z.string().trim().min(1),
  material: z.string().trim().min(1),
  description: z.string().trim().min(1),
  label: z.string().trim().min(1).optional(),
});

const productBody = z
  .object({
    slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must use lowercase letters, numbers, and hyphens"),
    category: z.enum(["Rings", "Necklaces", "Bracelets", "Watches"]),
    price: z.number().int().nonnegative(),
    image: z.string().trim().url(),
    position: z.number().int().nonnegative(),
    translations: z.object({
      en: translationSchema,
      fr: translationSchema,
      ar: translationSchema,
    }),
  })
  .strict();

type StoredTranslation = {
  name: string;
  material: string;
  description: string;
  label?: string | null;
};

type StoredProduct = {
  slug: string;
  category: string;
  price: number;
  image: string;
  position: number;
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

function presentProduct(product: StoredProduct, locale?: Locale) {
  if (!locale) {
    return {
      id: product.slug,
      category: product.category,
      price: product.price,
      image: product.image,
      position: product.position,
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
    image: product.image,
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
