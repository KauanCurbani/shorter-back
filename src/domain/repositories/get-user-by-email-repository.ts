import type { User } from "@prisma/client";

export interface GetUserByEmailRepository {
  execute: (email: string) => Promise<User | null>;
}
