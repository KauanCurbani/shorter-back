import { z } from "zod";

const schema = z.object({
  PORT: z.string().default("3000"),
})

export const Env = schema.parse(process.env)
export type EnvType = z.infer<typeof schema>