import type { ShortUrl } from "@prisma/client";

export interface GetShortUrlByUrlRepository {
  execute: (url: string) => Promise<ShortUrl | null>;
}
