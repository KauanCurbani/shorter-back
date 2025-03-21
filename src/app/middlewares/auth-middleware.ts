import { Env } from "@/utils/env";
import type { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const decoded = jwt.verify(token, Env.SECRET);
    if (!decoded) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    return next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}
