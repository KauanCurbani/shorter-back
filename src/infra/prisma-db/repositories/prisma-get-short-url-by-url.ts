import type { GetShortUrlByUrlRepository } from "@/domain/repositories/get-short-url-by-url-repository";
import type { PrismaClient, ShortUrl } from "@prisma/client";

export class PrismaGetShortUrlByUrl implements GetShortUrlByUrlRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(url: string): Promise<ShortUrl | null> {
    const response = await this.prisma.shortUrl.findFirst({
      where: {
        url: url,
        deletedAt: null,
      },
    });

    return response;
  }
}
