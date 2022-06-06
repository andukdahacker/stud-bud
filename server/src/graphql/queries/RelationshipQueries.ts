import { nonNull, queryField } from "nexus";
import { INTERNAL_SERVER_ERROR } from "../../constants";
import { ProfileWhereUniqueInput } from "../inputs";
import { BuddyRequestsOutput } from "../outputs";

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
        IOutput: {
          code: 200,
          success: true,
          message: "success",
        },
        Requests: requests,
      };
    } catch (error) {
      return {
        IOutput: {
          code: 500,
          success: false,
          message: INTERNAL_SERVER_ERROR,
        },
      };
    }
  },
});
