import type { GetUserByIdRepository } from "@/domain/repositories/get-user-by-id-repository";
import type { PrismaClient, User } from "@prisma/client";

export class PrismaGetUserByIdRepository implements GetUserByIdRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id, deletedAt: null },
    });
    return user;
  }
}
