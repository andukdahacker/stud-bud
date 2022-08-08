import Redis from "ioredis";

export const redis = new Redis({
  host: (process.env.REDIS_HOST as string) || "redis",
  port: 6379,
});
