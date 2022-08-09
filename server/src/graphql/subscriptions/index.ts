import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";
import { redisConfigs } from "../../redis";
export * from "./RelationshipSubs";
export * from "./MessageSubs";
export * from "./NotificationSubs";

export const pubsub = new RedisPubSub({
  publisher: new Redis(redisConfigs),
  subscriber: new Redis(redisConfigs),
});
