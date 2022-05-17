import { CacheOptions } from "@ajayyy/lru-diskcache";

export interface SBSConfig {
    [index: string]: any
    port: number;
    diskCache: CacheOptions;
}