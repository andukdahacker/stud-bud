import Redis, { RedisOptions } from "ioredis";
import { REDIS_HOST } from "./config";
// import { REDIS_HOST } from "./config";
import { __prod__ } from "./constants";

export const redisConfigs: RedisOptions = {
  host: (REDIS_HOST as string) || "redis",
  port: 6379,
  connectTimeout: 10000,
  retryStrategy: (times) => {
    return Math.min(times * 50, 2000);
  },
};

export const redis = __prod__ ? new Redis(redisConfigs) : new Redis();
