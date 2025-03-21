import type { ShortUrl } from "@prisma/client";
import type { Request } from "express";
import type { GetShortUrlByIdRepository } from "../repositories/get-short-url-by-id-repository";
import { z } from "zod";
import { NotFoundError, ValidationError } from "@/utils/errors";

export class GetShortUrlById {
  constructor(private readonly getByIdRepo: GetShortUrlByIdRepository) {}

  async execute(req: Request): Promise<ShortUrl> {
    const { error, data } = schema.safeParse(req.params);

    if (error) throw new ValidationError("Invalid input");

    const shortUrl = await this.getByIdRepo.execute(data.id);
    if (!shortUrl) throw new NotFoundError("Short URL not found");

    return shortUrl;
  }
}

const schema = z.object({
  id: z.string().nonempty(),
});
