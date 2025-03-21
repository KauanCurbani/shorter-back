export interface RemoveExpiredShortUrlsRepository {
    execute(): Promise<void>;
}