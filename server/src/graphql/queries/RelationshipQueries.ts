import { nonNull, queryField } from "nexus";
import {
  INTERNAL_SERVER_ERROR,
  QUERY_SUCCESS,
  UNSUCCESSFUL_QUERY,
} from "../../constants";
import { ProfileWhereUniqueInput } from "../inputs";

import { BuddyNotificationsOutput } from "../outputs";

export const getBuddyNotifications = queryField("getBuddyNotifications", {
  type: BuddyNotificationsOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
  },
  resolve: async (__root, args, ctx) => {
    const { profile_id } = args.where;

    try {
      const buddyRequests = await ctx.prisma.relationship.findMany({
        where: {
          addressee_id: profile_id,
          status: "REQUESTED",
        },
      });

      const buddyAccepts = await ctx.prisma.relationship.findMany({
        where: {
          addressee_id: profile_id,
          status: "ACCEPTED",
        },
      });

      if (!buddyRequests || !buddyAccepts) {
        return {
          IOutput: UNSUCCESSFUL_QUERY,
        };
      }

      return {
        IOutput: QUERY_SUCCESS,
        buddyRequests,
        buddyAccepts,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});
