import type { CreateShortUrlViewRepository } from "@/domain/repositories/create-short-url-view-repository";
import {prisma} from "../prisma"
import type { ShortUrlView } from "@prisma/client";

export class PrismaCreateShortUrlViewRepository implements CreateShortUrlViewRepository {

  async execute(urlId: string, userAgent?: string): Promise<ShortUrlView> {
    const view = await prisma.shortUrlView.create({
      data: {
        urlId: urlId,
        userAgent,
      },
    });
    return view;
  }
}
