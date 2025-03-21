import type { GetShortUrlByIdRepository } from "@/domain/repositories/get-short-url-by-id-repository";
import type { GetShortUrlById } from "@/domain/use-cases/get-short-url-by-id";
import type { PrismaClient, ShortUrl } from "@prisma/client";
import type { Request } from "express";

export class PrismaGetShortUrlByIdRepository implements GetShortUrlByIdRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string): Promise<ShortUrl | null> {
    return await this.prisma.shortUrl.findUnique({
      where: {
        id: id,
        deletedAt: null,
      },
    });
  }
}
