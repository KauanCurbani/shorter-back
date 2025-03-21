import type { ShortUrl } from "@prisma/client";
import type { Request } from "express";
import type { GetShortUrlByIdRepository } from "../repositories/get-short-url-by-id-repository";
import { z } from "zod";
import { NotFoundError, ValidationError } from "@/utils/errors";
import type { SetToExpiredShortUrlRepository } from "../repositories/set-to-expired-short-url-repository";

export class GetShortUrlById {
  constructor(
    private readonly getByIdRepo: GetShortUrlByIdRepository,
    private readonly setToExpiredRepo: SetToExpiredShortUrlRepository
  ) {}

  async execute(req: Request): Promise<ShortUrl> {
    const { error, data } = schema.safeParse(req.params);

    if (error) throw new ValidationError("Invalid input");

    const shortUrl = await this.getByIdRepo.execute(data.id);
    if (!shortUrl) throw new NotFoundError("Short URL not found");

    const isExpired = shortUrl.expiresAt && shortUrl.expiresAt < new Date();
    if (isExpired) {
      await this.setToExpiredRepo.execute(shortUrl.id);
      throw new NotFoundError("Short URL expired");
    }

    return shortUrl;
  }
}

const schema = z.object({
  id: z.string().nonempty(),
});
