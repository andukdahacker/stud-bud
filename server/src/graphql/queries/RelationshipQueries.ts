import { nonNull, queryField } from "nexus";
import { INTERNAL_SERVER_ERROR, QUERY_SUCCESS } from "../../constants";
import { ProfileWhereUniqueInput } from "../inputs";
import { BuddyPendingsOutput, BuddyRequestsOutput } from "../outputs";

export const getBuddyRequests = queryField("getBuddyRequests", {
  type: BuddyRequestsOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    try {
      const { profile_id } = args.where;

      const requests = await ctx.prisma.relationship.findMany({
        where: {
          addressee_id: profile_id,
          status: "REQUESTED",
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        IOutput: QUERY_SUCCESS,
        Requests: requests,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const getBuddyPendings = queryField("getBuddyPendings", {
  type: BuddyPendingsOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    const { profile_id } = args.where;
    try {
      const pendings = await ctx.prisma.relationship.findMany({
        where: {
          requester_id: profile_id,
          status: "REQUESTED",
        },
      });

      return {
        IOutput: QUERY_SUCCESS,
        Pendings: pendings,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});
