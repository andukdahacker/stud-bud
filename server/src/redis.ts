import Redis, { RedisOptions } from "ioredis";
import { REDIS_HOST } from "./config";
import { __prod__ } from "./constants";

export const redisConfigs: RedisOptions = {
  host: (REDIS_HOST as string) || "redis",
  port: 6379,
  retryStrategy: __prod__
    ? (times) => {
        return Math.min(times * 50, 2000);
      }
    : undefined,
};

export const redis = __prod__
  ? new Redis(redisConfigs)
  : new Redis({
      host: process.env.REDIS_HOST as string,
      port: 6379,
    });
