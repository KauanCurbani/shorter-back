import { Router } from "express";
import { handleRequest } from "../handle-request";
import { CreateBasicShortUrl } from "@/domain/use-cases/create-basic-short-url";
import { PrismaSaveShortUrlRepository } from "@/infra/prisma-db/repositories/prisma-save-short-url-repository";
import { prisma } from "@/infra/prisma-db/prisma";
import { PrismaGetShortUrlByUrl } from "@/infra/prisma-db/repositories/prisma-get-short-url-by-url";
import { GetShortUrlById } from "@/domain/use-cases/get-short-url-by-id";
import { PrismaGetShortUrlByIdRepository } from "@/infra/prisma-db/repositories/prisma-get-short-url-by-id";

export const publicController = Router()
const createBasicShortUrlUseCase = new CreateBasicShortUrl(new PrismaSaveShortUrlRepository(prisma), new PrismaGetShortUrlByUrl(prisma))
const getShortUrlByUrl = new GetShortUrlById(new PrismaGetShortUrlByIdRepository(prisma))

publicController.post("/short-url", async (req, res) => {
  await handleRequest((req) => createBasicShortUrlUseCase.execute(req), req, res)
})

publicController.get("/short-url/:id", async (req, res) => {
  await handleRequest((req) => getShortUrlByUrl.execute(req), req, res)
})