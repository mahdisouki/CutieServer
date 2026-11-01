import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../auth";
import { locate } from "../geo";
import { asyncRoute, HttpError } from "../http";
import { Presence } from "../models";

const activeMs = 60_000;

const presenceBody = z
  .object({
    visitorId: z.string().uuid(),
  })
  .strict();

function cutoff() {
  return new Date(Date.now() - activeMs);
}

function clientIp(ip: string | undefined) {
  if (!ip) throw new HttpError(400, "Missing client address");
  return ip.replace(/^::ffff:/, "");
}

export function presenceRoutes(jwtSecret: string) {
  const router = Router();
  const staff = requireAuth(jwtSecret);

  router.post(
    "/",
    asyncRoute(async (req, res) => {
      const body = presenceBody.parse(req.body);
      const location = locate(clientIp(req.ip));
      const lastSeen = new Date();
      await Presence.deleteMany({ lastSeen: { $lt: cutoff() } });
      await Presence.findOneAndUpdate(
        { visitorId: body.visitorId },
        { visitorId: body.visitorId, city: location.city, country: location.country, lastSeen },
        { upsert: true, runValidators: true, setDefaultsOnInsert: true },
      );
      res.status(204).end();
    }),
  );

  router.get(
    "/",
    staff,
    asyncRoute(async (_req, res) => {
      await Presence.deleteMany({ lastSeen: { $lt: cutoff() } });
      const visitors = await Presence.find({ lastSeen: { $gte: cutoff() } }).sort({ lastSeen: -1 });
      res.json({
        count: visitors.length,
        visitors: visitors.map((visitor) => ({
          city: visitor.city,
          country: visitor.country,
          lastSeen: visitor.lastSeen.toISOString(),
        })),
      });
    }),
  );

  return router;
}
