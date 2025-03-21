import { prisma } from "@/infra/prisma-db/prisma";
import { Env } from "@/utils/env";
import { UnauthorizedError } from "@/utils/errors";
import type { Request } from "express";
import * as jwt from "jsonwebtoken";

export class AuthenticatedUser {
  static async getUser(req: Request) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new UnauthorizedError("Token not provided");

    const secret = Env.SECRET;
    const decoded = jwt.verify(token, secret) as { id: string };
    if (!decoded) throw new UnauthorizedError("Invalid token");

    const userId = decoded.id;
    if (!userId) throw new UnauthorizedError("Invalid token");

    const user = await prisma.user.findUnique({
      where: { id: userId, deletedAt: null },
    });

    if (!user) throw new UnauthorizedError("User not found");
    return user;
  }
}
