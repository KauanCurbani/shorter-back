import type { SaveShortUrlRepository } from "@/domain/repositories/save-short-url-repository";
import type { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

export class PrismaSaveShortUrlRepository implements SaveShortUrlRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(url: string, expiresAt: Date) {
    const id = nanoid(7);

    const shortUrl = await this.prisma.shortUrl.create({
      data: {
        id,
        url,
        expiresAt,
      },
    });
    return shortUrl;
  }
}
