import type { ShortUrl } from "@prisma/client";

export interface GetShortUrlByIdRepository {
  execute: (id: string) => Promise<ShortUrl | null>;
}