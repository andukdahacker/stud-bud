import Redis from "ioredis";
import { REDIS_HOST } from "./config";

export const redis = new Redis({
  host: (REDIS_HOST as string) || "redis",
  port: 6379,
});
