import type { SaveUserRepository } from "@/domain/repositories/save-user-repository";
import { ValidationError } from "@/utils/errors";
import type { PrismaClient, User } from "@prisma/client";

export class PrismaSaveUserRepository implements SaveUserRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async execute(data: Partial<User>): Promise<User> {
    if (!data.name || !data.email || !data.password) {
      throw new ValidationError("Missing data");
    }

    const newUser = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
    return newUser;
  }
}
