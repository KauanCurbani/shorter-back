import { RegisterUserUseCase } from "@/domain/use-cases/register-user";
import { prisma } from "@/infra/prisma-db/prisma";
import { PrismaGetUserByEmailRepository } from "@/infra/prisma-db/repositories/prisma-get-user-by-email-repository";
import { PrismaSaveUserRepository } from "@/infra/prisma-db/repositories/prisma-save-user-repository";
import { Router } from "express";
import { handleRequest } from "../handle-request";

export const authController = Router();
const registerUseCase = new RegisterUserUseCase(
  new PrismaGetUserByEmailRepository(prisma),
  new PrismaSaveUserRepository(prisma)
);

authController.post("/register", async (req, res) => {
  await handleRequest((req) => registerUseCase.execute(req), req, res);
});
