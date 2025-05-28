import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject } from "@nestjs/common";
import { Cache } from "cache-manager";

export default class OtpSecretCacheRepository {

    public constructor(
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,
    ) { };

    public async get(
        key: string
    ) {

        const value = await this.cacheManager.get<string>(key);

        return value;

    };

    public async set(
        params: {
            key: string,
            value: string,
            ttl: number,
        }
    ) {

        const {
            key,
            value,
            ttl = 0,
        } = params;

        await this.cacheManager.set(key, value, ttl);

        return this.get(key);

    };

};