import type { SetToExpiredShortUrlRepository } from "@/domain/repositories/set-to-expired-short-url-repository";
import type { PrismaClient } from "@prisma/client";

export class PrismaSetToExpiredShortUrlRepository implements SetToExpiredShortUrlRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string): Promise<void> {
    await this.prisma.shortUrl.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  }
}
