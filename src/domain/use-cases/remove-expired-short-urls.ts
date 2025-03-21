import type { RemoveExpiredShortUrlsRepository } from "../repositories/remove-expired-short-urls-repository";

export class RemoveExpiredShortUrls {
  constructor(private shortUrlRepository: RemoveExpiredShortUrlsRepository) {}

  async execute() {
    await this.shortUrlRepository.execute();
  }
}
