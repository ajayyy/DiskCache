import LRU from "@ajayyy/lru-diskcache";
import { config } from "../config";

const DiskCache = new LRU("./databases/cache", config.diskCache);
DiskCache.init();

export default DiskCache;