import type { SaveShortUrlRepository } from "@/domain/repositories/save-short-url-repository";
import type { PrismaClient } from "@prisma/client";

export class PrismaSaveShortUrlRepository implements SaveShortUrlRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(url: string, expiresAt: Date) {
    const shortUrl = await this.prisma.shortUrl.create({
      data: {
        url,
        expiresAt,
      },
    });
    return shortUrl;
  }
}
