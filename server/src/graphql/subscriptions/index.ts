import { PubSub } from "graphql-subscriptions";
export * from "./RelationshipSubs";
export * from "./MessageSubs";
export * from "./NotificationSubs";

export const pubsub = new PubSub();
