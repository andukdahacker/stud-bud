import { nonNull, queryField } from "nexus";
import {
  INTERNAL_SERVER_ERROR,
  QUERY_SUCCESS,
  RELATIONSHIP_ACCEPT,
  RELATIONSHIP_CONNECT,
} from "../../constants";
import { ProfileWhereUniqueInput } from "../inputs";
import { NotificationOutput } from "../outputs/NotificationOutput";

export const getNotifications = queryField("getNotification", {
  type: NotificationOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    const { profile_id } = args.where;
    try {
      const buddyNotifications = await ctx.prisma.notification.findMany({
        where: {
          receiver_id: profile_id,
          OR: [
            {
              type_id: RELATIONSHIP_ACCEPT,
            },
            {
              type_id: RELATIONSHIP_CONNECT,
            },
          ],
        },
      });

      const otherNotifications = await ctx.prisma.notification.findMany({
        where: {
          receiver_id: profile_id,
          NOT: [
            {
              type_id: RELATIONSHIP_ACCEPT,
            },
            {
              type_id: RELATIONSHIP_CONNECT,
            },
          ],
        },
      });

      return {
        IOutput: QUERY_SUCCESS,
        Notifications: otherNotifications,
        BuddyNotifications: buddyNotifications,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});
