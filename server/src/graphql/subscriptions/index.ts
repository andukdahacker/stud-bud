import { PubSub } from "graphql-subscriptions";
export * from "./RelationshipSubs";
export * from "./MessageSubs";

export const pubsub = new PubSub();
