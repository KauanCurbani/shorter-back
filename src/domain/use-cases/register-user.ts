import { ValidationError } from "@/utils/errors";
import type { Request } from "express";
import { z } from "zod";
import type { GetUserByEmailRepository } from "../repositories/get-user-by-email-repository";
import type { SaveUserRepository } from "../repositories/save-user-repository";
import * as bcrypt from "bcrypt";

export class RegisterUserUseCase {
  constructor(
    private readonly getUserByEmailRepo: GetUserByEmailRepository,
    private readonly saveUserRepo: SaveUserRepository,
  ) {}

  async execute(req: Request) {
    const { error, data } = schema.safeParse(req.body);
    if (error) throw new ValidationError("Invalid data body");

    const { fullName, email, password, passwordConfirmation } = data;
    if (password !== passwordConfirmation)
      throw new ValidationError("Passwords do not match");

    const user = await this.getUserByEmailRepo.execute(email);
    if (user) throw new ValidationError("Email already in use");

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.saveUserRepo.execute({
      name: fullName,
      email,
      password: hashedPassword,
    });

    return newUser;
  }

  private async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
}

const schema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  passwordConfirmation: z.string().min(6),
});
