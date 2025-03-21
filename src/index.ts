import express from "express";
import cors from "cors";
import { Env } from "@/utils/env";
import { publicController } from "./app/controllers/public-controller";
import { authController } from "./app/controllers/auth-controller";
import { userController } from "./app/controllers/user-controller";
import { authMiddleware } from "./app/middlewares/auth-middleware";
import { RemoveExpiredShortUrls } from "./domain/use-cases/remove-expired-short-urls";
import { PrismaRemoveExpiredShortUrlsRepository } from "./infra/prisma-db/repositories/prisma-remove-expired-short-urls";
import { prisma } from "./infra/prisma-db/prisma";
import { CronJob } from "cron";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", publicController);
app.use("/api/auth", authController);
app.use("/api/user", authMiddleware, userController);

app.listen(Env.PORT, (err) => {
  if (err) console.error(err);
  console.log(`🔥 Server running on port ${Env.PORT}`);
});

// run cron job every 1 hour
const job = new CronJob("0 * * * *", async () => {
  new RemoveExpiredShortUrls(new PrismaRemoveExpiredShortUrlsRepository(prisma)).execute();
});
job.start();
