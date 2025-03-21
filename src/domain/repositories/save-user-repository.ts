import type { User } from "@prisma/client";

export interface SaveUserRepository {
    execute: (data: Partial<User>) => Promise<User>;
}