import type { Request } from "express";
import type { SaveShortUrlRepository } from "../repositories/save-short-url-repository";
import { z } from "zod";
import { ValidationError } from "@/utils/errors";
import type { GetShortUrlByUrlRepository } from "../repositories/get-short-url-by-url-repository";

export class CreateBasicShortUrl {
  constructor(private readonly saveShortUrlRepo: SaveShortUrlRepository,
  private readonly getShortUrlRepo: GetShortUrlByUrlRepository
  ) {}

  async execute(req: Request) {
    const { error, data } = schema.safeParse(req.body);
    if (error) throw new ValidationError("Body invalid");
    
    const shortUrl = await this.getShortUrlRepo.execute(data.url);
    if (shortUrl) {
      return shortUrl;
    }

    let expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const response = await this.saveShortUrlRepo.execute(data.url, expiresAt);
    return response;
  }
}

const schema = z.object({
  url: z.string().url(),
});
