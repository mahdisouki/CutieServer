import { Router } from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { requireAuth } from "../auth";
import { asyncRoute, HttpError } from "../http";
import { Order, Product } from "../models";

const orderItems = z
  .array(
    z.object({
      productId: z.string().trim().min(1),
      variantId: z.string().trim().min(1),
      quantity: z.number().int().positive(),
    }),
  )
  .min(1);

const checkoutBody = z
  .object({
    email: z.string().trim().email(),
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    address: z.string().trim().min(1),
    city: z.string().trim().min(1),
    postalCode: z.string().trim().min(1),
    items: orderItems,
  })
  .strict();

const directBody = z
  .object({
    name: z.string().trim().min(1),
    phone: z.string().trim().min(8, "Phone number is too short"),
    address: z.string().trim().min(1),
    items: orderItems,
  })
  .strict();

const orderBody = z.union([directBody, checkoutBody]);

const deliveryFee = 7;

const statusBody = z
  .object({
    status: z.enum(["new", "confirmed", "fulfilled", "cancelled"]),
  })
  .strict();

type OrderItem = {
  productId: string;
  variantId: string;
  quantity: number;
  name: string;
  color: string;
  price: number;
};

function customerName(order: { _id: { toString(): string }; name?: string | null; firstName?: string | null; lastName?: string | null }) {
  if (order.name) return order.name;
  const combined = [order.firstName, order.lastName].filter((part) => part).join(" ");
  if (!combined) throw new HttpError(500, `Order ${order._id.toString()} is missing a name`);
  return combined;
}

function presentOrder(order: {
  _id: { toString(): string };
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  address: string;
  city?: string | null;
  postalCode?: string | null;
  items: OrderItem[];
  subtotal: number;
  deliveryFee?: number;
  total?: number;
  paymentMethod?: string;
  status: string;
  createdAt: Date;
}) {
  if (order.deliveryFee == null || order.total == null || order.paymentMethod == null) {
    throw new HttpError(500, `Order ${order._id.toString()} is missing a delivery fee`);
  }
  return {
    id: order._id.toString(),
    name: customerName(order),
    phone: order.phone ?? null,
    email: order.email ?? null,
    firstName: order.firstName ?? null,
    lastName: order.lastName ?? null,
    address: order.address,
    city: order.city ?? null,
    postalCode: order.postalCode ?? null,
    items: order.items,
    subtotal: order.subtotal,
    deliveryFee: order.deliveryFee,
    total: order.total,
    paymentMethod: order.paymentMethod,
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

      const requestedByKey = new Map<string, number>();
      for (const item of body.items) {
        const key = `${item.productId}::${item.variantId}`;
        requestedByKey.set(key, (requestedByKey.get(key) ?? 0) + item.quantity);
      }

      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        const items: OrderItem[] = [];
        let subtotal = 0;

        for (const item of body.items) {
          const product = await Product.findOne({ slug: item.productId }).session(session);
          if (!product) throw new HttpError(400, `Unknown product ${item.productId}`);
          const variant = product.variants.find((entry) => entry.id === item.variantId);
          if (!variant) throw new HttpError(400, `Unknown variant ${item.variantId} for ${item.productId}`);
          const englishName = product.translations?.en?.name;
          if (!englishName) throw new HttpError(500, `Missing en translation for ${product.slug}`);
          items.push({
            productId: product.slug,
            variantId: variant.id,
            quantity: item.quantity,
            name: englishName,
            color: variant.color,
            price: product.price,
          });
          subtotal += product.price * item.quantity;
        }

        for (const [key, requested] of requestedByKey) {
          const [slug, variantId] = key.split("::");
          const product = await Product.findOne({ slug }).session(session);
          if (!product) throw new HttpError(400, `Unknown product ${slug}`);
          const variant = product.variants.find((entry) => entry.id === variantId);
          if (!variant) throw new HttpError(400, `Unknown variant ${variantId} for ${slug}`);
          if (requested > variant.quantity) {
            throw new HttpError(400, `Not enough stock for ${slug}/${variantId}`);
          }
          variant.quantity -= requested;
          await product.save({ session });
        }

        const customer =
          "phone" in body
            ? { name: body.name, phone: body.phone, address: body.address }
            : {
                name: `${body.firstName} ${body.lastName}`,
                email: body.email,
                firstName: body.firstName,
                lastName: body.lastName,
                address: body.address,
                city: body.city,
                postalCode: body.postalCode,
              };

        const [order] = await Order.create(
          [
            {
              ...customer,
              items,
              subtotal,
              deliveryFee,
              total: subtotal + deliveryFee,
              paymentMethod: "cash",
              status: "new",
            },
          ],
          { session },
        );

        await session.commitTransaction();
        res.status(201).json(presentOrder(order));
      } catch (error) {
        await session.abortTransaction();
        throw error;
      } finally {
        session.endSession();
      }
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
