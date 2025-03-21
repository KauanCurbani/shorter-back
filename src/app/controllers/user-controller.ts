import { GetUserInfo } from "@/domain/use-cases/get-user-info";
import { Router } from "express";
import { handleRequest } from "../handle-request";

export const userController = Router();
const getUserInfoUseCase = new GetUserInfo();

userController.get("/me", async (req, res) => {
  await handleRequest((req) => getUserInfoUseCase.execute(req), req, res);
});
