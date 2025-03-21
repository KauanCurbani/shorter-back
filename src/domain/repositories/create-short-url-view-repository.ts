import type { ShortUrlView } from "@prisma/client";

export interface CreateShortUrlViewRepository {
    execute(urlId:string, userAgent?: string): Promise<ShortUrlView> 
}