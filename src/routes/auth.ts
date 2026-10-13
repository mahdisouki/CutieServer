import bcrypt from "bcryptjs";
import { Router } from "express";
import { z } from "zod";
import { requireAuth, signToken } from "../auth";
import { asyncRoute, HttpError } from "../http";
import { Admin } from "../models";

const loginBody = z
  .object({
    email: z.string().trim().email(),
    password: z.string().min(1),
  })
  .strict();

export function authRoutes(jwtSecret: string) {
  const router = Router();

  router.post(
    "/login",
    asyncRoute(async (req, res) => {
      const body = loginBody.parse(req.body);
      const admin = await Admin.findOne({ email: body.email.toLowerCase() }).select("+password");
      if (!admin) throw new HttpError(401, "Invalid email or password");
      if (!admin.password) throw new Error("Admin record is missing a password");
      const matches = await bcrypt.compare(body.password, admin.password);
      if (!matches) throw new HttpError(401, "Invalid email or password");
      const token = signToken({ sub: admin.id, email: admin.email }, jwtSecret);
      res.json({ token, email: admin.email });
    }),
  );

  router.get(
    "/me",
    requireAuth(jwtSecret),
    asyncRoute(async (req, res) => {
      if (!req.auth) throw new HttpError(401, "Missing bearer token");
      res.json({ email: req.auth.email });
    }),
  );

  return router;
}
