import type { ShortUrl } from "@prisma/client";

export interface SaveShortUrlRepository {
  execute: (url: string, expiresAt: Date) => Promise<ShortUrl>;
}
