import type { Request } from "express";
import { AuthenticatedUser } from "../utils/authenticated-user";

export class GetUserInfo {
  constructor() {}

  async execute(req: Request) {
    const user = await AuthenticatedUser.getUser(req);
    if (!user) throw new Error("User not found");
    (user as { password?: string }).password = undefined;
    return user;
  }
}
