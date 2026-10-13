import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../auth";
import { asyncRoute, HttpError } from "../http";
import { Order, Product } from "../models";

const orderBody = z
  .object({
    email: z.string().trim().email(),
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    address: z.string().trim().min(1),
    city: z.string().trim().min(1),
    postalCode: z.string().trim().min(1),
    items: z
      .array(
        z.object({
          productId: z.string().trim().min(1),
          quantity: z.number().int().positive(),
        }),
      )
      .min(1),
  })
  .strict();

const statusBody = z
  .object({
    status: z.enum(["new", "confirmed", "fulfilled", "cancelled"]),
  })
  .strict();

function presentOrder(order: {
  _id: { toString(): string };
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  items: { productId: string; quantity: number; name: string; price: number }[];
  subtotal: number;
  status: string;
  createdAt: Date;
}) {
  return {
    id: order._id.toString(),
    email: order.email,
    firstName: order.firstName,
    lastName: order.lastName,
    address: order.address,
    city: order.city,
    postalCode: order.postalCode,
    items: order.items,
    subtotal: order.subtotal,
    status: order.status,
    createdAt: order.createdAt.toISOString(),
  };
}

export function orderRoutes(jwtSecret: string) {
  const router = Router();
  const staff = requireAuth(jwtSecret);

  router.post(
    "/",
    asyncRoute(async (req, res) => {
      const body = orderBody.parse(req.body);
      const items = [];
      let subtotal = 0;
      for (const item of body.items) {
        const product = await Product.findOne({ slug: item.productId });
        if (!product) throw new HttpError(400, `Unknown product ${item.productId}`);
        const englishName = product.translations?.en?.name;
        if (!englishName) throw new HttpError(500, `Missing en translation for ${product.slug}`);
        items.push({
          productId: product.slug,
          quantity: item.quantity,
          name: englishName,
          price: product.price,
        });
        subtotal += product.price * item.quantity;
      }
      const order = await Order.create({
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        address: body.address,
        city: body.city,
        postalCode: body.postalCode,
        items,
        subtotal,
        status: "new",
      });
      res.status(201).json(presentOrder(order));
    }),
  );

  router.get(
    "/",
    staff,
    asyncRoute(async (_req, res) => {
      const orders = await Order.find().sort({ createdAt: -1 });
      res.json(orders.map((order) => presentOrder(order)));
    }),
  );

  router.get(
    "/:id",
    staff,
    asyncRoute(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (!order) throw new HttpError(404, "Order not found");
      res.json(presentOrder(order));
    }),
  );

  router.patch(
    "/:id",
    staff,
    asyncRoute(async (req, res) => {
      const body = statusBody.parse(req.body);
      const order = await Order.findById(req.params.id);
      if (!order) throw new HttpError(404, "Order not found");
      order.status = body.status;
      await order.save();
      res.json(presentOrder(order));
    }),
  );

  return router;
}
