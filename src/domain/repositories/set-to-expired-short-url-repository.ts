export interface SetToExpiredShortUrlRepository {
    execute(id: string): Promise<void>;
}