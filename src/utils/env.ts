import { z } from "zod";

const schema = z.object({
  PORT: z.string().default("3000"),
  SECRET: z.string().default("secret"),
});

export const Env = schema.parse(process.env);
export type EnvType = z.infer<typeof schema>;
