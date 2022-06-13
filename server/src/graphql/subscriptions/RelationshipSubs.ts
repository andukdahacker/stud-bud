import { nonNull, subscriptionField } from "nexus";
import { Notification } from "../../types";
import { pubsub } from ".";
import {
  ACCEPT_BUDDY_EVENT,
  CONNECT_BUDDY_EVENT,
  INTERNAL_SERVER_ERROR,
  QUERY_SUCCESS,
} from "../../constants";
import { ProfileWhereUniqueInput } from "../inputs";
import { NotificationOutput } from "../outputs/NotificationOutput";
import { withFilter } from "graphql-subscriptions";

export const connectBuddyEvent = subscriptionField("getNotification", {
  type: NotificationOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
  },
  subscribe: withFilter(
    () => pubsub.asyncIterator([CONNECT_BUDDY_EVENT, ACCEPT_BUDDY_EVENT]),
    (root: Notification, args, _ctx) => {
      return root.data.receiver_id === args.where.profile_id;
    }
  ),
  resolve: async (root: Notification, _args, ctx) => {
    try {
      const newBuddyNotification = await ctx.prisma.notification.findUnique({
        where: {
          id: root.data.id,
        },
      });

      if (!newBuddyNotification)
        return {
          IOutput: {
            code: 400,
            success: false,
            message: "Cannot get notification",
          },
        };

      return {
        IOutput: QUERY_SUCCESS,
        BuddyNotifications: [newBuddyNotification],
        Notifications: [],
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});
