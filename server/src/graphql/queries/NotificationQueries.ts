import { nonNull, queryField } from "nexus";
import { INTERNAL_SERVER_ERROR, QUERY_SUCCESS } from "../../constants";
import { ProfileWhereUniqueInput } from "../inputs";
import { GetNotificationOutput } from "../outputs/NotificationOutput";

export const getNotifications = queryField("getNotifications", {
  type: GetNotificationOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    const { profile_id } = args.where;
    try {
      const notifications = await ctx.prisma.notification.findMany({
        where: {
          receiver_id: profile_id,
        },
      });

      return {
        IOutput: QUERY_SUCCESS,
        notifications,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});
