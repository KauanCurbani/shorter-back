import type { User } from "@prisma/client";

export interface GetUserByIdRepository {
  execute(id: string): Promise<User | null>;
}
