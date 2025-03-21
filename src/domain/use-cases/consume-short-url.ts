import type { Request } from "express";
import type { GetShortUrlByIdRepository } from "../repositories/get-short-url-by-id-repository";
import { z } from "zod";
import { BadRequestError } from "@/utils/errors";
import type { CreateShortUrlViewRepository } from "../repositories/create-short-url-view-repository";

export class ConsumeShortUrl {
  constructor(
    private readonly getShortUrlByIdRepository: GetShortUrlByIdRepository,
    private readonly createShortUrlViewRepository: CreateShortUrlViewRepository
  ) {}

  async execute(req: Request) {
    const { error, data } = schema.safeParse(req.params);
    if (error) throw new BadRequestError("Invalid input");
    const shortUrl = await this.getShortUrlByIdRepository.execute(data.id);
    if (!shortUrl) throw new BadRequestError("Short URL not found");
    const isExpired = shortUrl.expiresAt && shortUrl.expiresAt < new Date();
    if (isExpired) throw new BadRequestError("Short URL expired");

    const userAgent = req.headers["user-agent"];
    await this.createShortUrlViewRepository.execute(shortUrl.id, userAgent);
  }
}

const schema = z.object({
  id: z.string().nonempty(),
});
