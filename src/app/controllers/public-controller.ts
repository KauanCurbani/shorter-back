import { Router } from "express";
import { handleRequest } from "../handle-request";
import { CreateBasicShortUrl } from "@/domain/use-cases/create-basic-short-url";
import { PrismaSaveShortUrlRepository } from "@/infra/prisma-db/repositories/prisma-save-short-url-repository";
import { prisma } from "@/infra/prisma-db/prisma";
import { PrismaGetShortUrlByUrl } from "@/infra/prisma-db/repositories/prisma-get-short-url-by-url";
import { GetShortUrlById } from "@/domain/use-cases/get-short-url-by-id";
import { PrismaGetShortUrlByIdRepository } from "@/infra/prisma-db/repositories/prisma-get-short-url-by-id";
import { PrismaSetToExpiredShortUrlRepository } from "@/infra/prisma-db/repositories/prisma-set-to-expired-short-url";
import { ConsumeShortUrl } from "@/domain/use-cases/consume-short-url";
import { PrismaCreateShortUrlViewRepository } from "@/infra/prisma-db/repositories/prisma-create-short-url-view";

export const publicController = Router();
const createBasicShortUrlUseCase = new CreateBasicShortUrl(
  new PrismaSaveShortUrlRepository(prisma),
  new PrismaGetShortUrlByUrl(prisma)
);
const getShortUrlByUrl = new GetShortUrlById(
  new PrismaGetShortUrlByIdRepository(prisma),
  new PrismaSetToExpiredShortUrlRepository(prisma)
);
const consumeShort = new ConsumeShortUrl(
  new PrismaGetShortUrlByIdRepository(prisma),
  new PrismaCreateShortUrlViewRepository()
);

publicController.post("/short-url", async (req, res) => {
  await handleRequest((req) => createBasicShortUrlUseCase.execute(req), req, res);
});
publicController.get("/short-url/:id", async (req, res) => {
  await handleRequest((req) => getShortUrlByUrl.execute(req), req, res);
});
publicController.get("/short-url/consume/:id", async (req, res) => {
  await handleRequest((req) => consumeShort.execute(req), req, res);
});
