import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HttpError } from "./http";

export type AuthPayload = { sub: string; email: string };

export function signToken(payload: AuthPayload, secret: string) {
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export function requireAuth(secret: string) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const header = req.header("authorization");
    if (!header?.startsWith("Bearer ")) {
      next(new HttpError(401, "Missing bearer token"));
      return;
    }
    const token = header.slice("Bearer ".length);
    try {
      const payload = jwt.verify(token, secret);
      if (typeof payload === "string" || typeof payload.sub !== "string" || typeof payload.email !== "string") {
        throw new HttpError(401, "Invalid token");
      }
      req.auth = { sub: payload.sub, email: payload.email };
      next();
    } catch (error) {
      next(error instanceof HttpError ? error : new HttpError(401, "Invalid token"));
    }
  };
}
