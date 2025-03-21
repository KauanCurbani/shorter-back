import type { GetUserByEmailRepository } from "@/domain/repositories/get-user-by-email-repository";
import type { PrismaClient, User } from "@prisma/client";

export class PrismaGetUserByEmailRepository implements GetUserByEmailRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email, deletedAt: null },
    });

    return user;
  }
}
