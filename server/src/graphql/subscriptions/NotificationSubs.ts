import { Notification } from "@prisma/client";
import { withFilter } from "graphql-subscriptions";
import { nonNull, subscriptionField } from "nexus";
import {
  INTERNAL_SERVER_ERROR,
  NEW_NOTIFICATION_EVENT,
  QUERY_SUCCESS,
  UNSUCCESSFUL_QUERY,
} from "../../constants";
import { pubsub } from ".";
import { ProfileWhereUniqueInput } from "../inputs";
import { GetNotificationOutput } from "../outputs/NotificationOutput";

export const getNotificationsSub = subscriptionField("getNotifications", {
  type: GetNotificationOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
  },
  subscribe: withFilter(
    () => pubsub.asyncIterator([NEW_NOTIFICATION_EVENT]),
    (root: Notification, args, _ctx) => {
      return root.receiver_id === args.where.profile_id;
    }
  ),
  resolve: async (root: Notification, args, ctx) => {
    const { profile_id } = args.where;
    try {
      const notification = await ctx.prisma.notification.findUnique({
        where: {
          id: root.id,
        },
      });

      const countNotViewedNotifications = await ctx.prisma.notification.count({
        where: {
          receiver_id: profile_id,
          isViewed: false,
        },
      });

      if (!notification) {
        return {
          IOutput: UNSUCCESSFUL_QUERY,
        };
      }

      return {
        IOutput: QUERY_SUCCESS,
        notifications: [notification],
        countNotViewedNotifications,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});
