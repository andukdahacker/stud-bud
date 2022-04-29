import { nonNull, queryField } from "nexus";
import { INTERNAL_SERVER_ERROR } from "../../constants";
import { getManyInterestsInput } from "../inputs";
import { GetManyInterestOutput } from "../outputs";

export const getManyInterests = queryField("getManyInterests", {
  type: GetManyInterestOutput,
  args: {
    where: nonNull(getManyInterestsInput),
  },
  resolve: async (_root, args, ctx) => {
    try {
      const { search_input } = args.where;

      const interests = await ctx.prisma.interest.findMany({
        where:
          search_input == null
            ? {}
            : {
                interest_name: { contains: search_input, mode: "insensitive" },
              },
      });

      return {
        IOutput: {
          code: 200,
          success: true,
          message: "Query is done successfully",
        },
        Interest: interests,
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
