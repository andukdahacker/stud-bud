import { subscriptionField } from "nexus";
import { pubsub } from ".";
import { GetNotificationOutput } from "../outputs/NotificationOutput";

export const getNotificationsSub = subscriptionField("getNotifications", {
  type: GetNotificationOutput,
  subscribe: () => pubsub.asyncIterator([]),
  resolve: (_root, _args, _ctx) => {
    return null;
  },
});
