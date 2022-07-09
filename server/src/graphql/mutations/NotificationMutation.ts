import { mutationField, nonNull } from "nexus";
import {
  INTERNAL_SERVER_ERROR,
  QUERY_SUCCESS,
  SUCCESSFUL_MUTATION,
  UNSUCCESSFUL_MUTATION,
  UNSUCCESSFUL_QUERY,
} from "../../constants";
import { ProfileWhereUniqueInput } from "../inputs";
import { NotificationWhereUniqueInput } from "../inputs/NotificationInput";
import { NotificationMutationOutput } from "../outputs/NotificationOutput";

export const viewNotification = mutationField("viewNotification", {
  type: NotificationMutationOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    const { profile_id } = args.where;
    try {
      const notification = await ctx.prisma.notification.updateMany({
        where: {
          receiver_id: profile_id,
        },
        data: {
          isViewed: true,
        },
      });

      if (!notification)
        return {
          IOutput: UNSUCCESSFUL_QUERY,
        };

      return {
        IOutput: QUERY_SUCCESS,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const readNotification = mutationField("readNotification", {
  type: NotificationMutationOutput,
  args: {
    where: nonNull(NotificationWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    const { id } = args.where;
    try {
      const notification = await ctx.prisma.notification.update({
        where: {
          id,
        },
        data: {
          isRead: true,
        },
      });

      if (!notification)
        return {
          IOutput: UNSUCCESSFUL_MUTATION,
        };

      return {
        IOutput: SUCCESSFUL_MUTATION,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});
