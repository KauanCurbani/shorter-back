import * as bcrypt from "bcrypt";
import type { Request } from "express";
import * as jwt from "jsonwebtoken";
import { z } from "zod";
import { BadRequestError } from "../../utils/errors";
import type { GetUserByEmailRepository } from "../repositories/get-user-by-email-repository";

import { Env } from "../../utils/env";

export class SignInUserUseCase {
  constructor(private readonly getUserByEmailRepo: GetUserByEmailRepository) {}

  async execute(req: Request) {
    const { data, error } = schema.safeParse(req.body);
    if (error) throw new BadRequestError("Invalid request body");

    const user = await this.getUserByEmailRepo.execute(data.email);
    if (!user) throw new BadRequestError("Invalid credentials");

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) throw new BadRequestError("Invalid credentials");

    const { email, id, name } = user;
    const token = jwt.sign({ email, id, name }, Env.SECRET, {
      expiresIn: "1d",
    });

    return { token };
  }
}

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});
