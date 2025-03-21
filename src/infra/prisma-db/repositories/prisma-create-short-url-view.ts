import type { CreateShortUrlViewRepository } from "@/domain/repositories/create-short-url-view-repository";
import type { PrismaClient, ShortUrlView } from "@prisma/client";

export class PrismaCreateShortUrlViewRepository implements CreateShortUrlViewRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(urlId: string, userAgent?: string): Promise<ShortUrlView> {
    const view = await this.prisma.shortUrlView.create({
      data: {
        urlId: urlId,
        userAgent,
      },
    });
    return view;
  }
}
