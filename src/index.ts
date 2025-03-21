import express from "express";
import cors from "cors";
import { Env } from "@/utils/env";
import { publicController } from "./app/controllers/public-controller";
import { authController } from "./app/controllers/auth-controller";
import { userController } from "./app/controllers/user-controller";
import { authMiddleware } from "./app/middlewares/auth-middleware";

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
