import Redis, { RedisOptions } from "ioredis";
import { REDIS_HOST } from "./config";

export const redisConfigs: RedisOptions = {
  host: (REDIS_HOST as string) || "redis",
  port: 6379,
  retryStrategy: (times) => {
    return Math.min(times * 50, 2000);
  },
};
export const redis = new Redis(redisConfigs);
