import type { RemoveExpiredShortUrlsRepository } from "@/domain/repositories/remove-expired-short-urls-repository";
import type { PrismaClient } from "@prisma/client";

export class PrismaRemoveExpiredShortUrlsRepository implements RemoveExpiredShortUrlsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(): Promise<void> {
    console.log("Removing expired short URLs...");
    const now = new Date();
    const response = await this.prisma.shortUrl.updateManyAndReturn({
      data: {
        deletedAt: now,
      },
      where: {
        expiresAt: {
          lte: now,
        },
        deletedAt: null,
      },
    });
    console.log(`Removed ${response.length} expired short URLs`);
  }
}
