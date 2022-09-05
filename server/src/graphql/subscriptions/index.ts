import { RedisPubSub } from "graphql-redis-subscriptions";
import { PubSub } from "graphql-subscriptions";
import Redis from "ioredis";
import { __prod__ } from "../../constants";
import { redisConfigs } from "../../redis";
export * from "./RelationshipSubs";
export * from "./MessageSubs";
export * from "./NotificationSubs";

export const pubsub = __prod__
  ? new RedisPubSub({
      publisher: new Redis(redisConfigs),
      subscriber: new Redis(redisConfigs),
    })
  : new PubSub();
