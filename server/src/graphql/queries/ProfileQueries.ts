import { nonNull, queryField } from "nexus";
import { INTERNAL_SERVER_ERROR } from "../../constants";
import { GetManyProfilesInput, ProfileWhereUniqueInput } from "../inputs";
import { GetManyProfilesOutput, GetProfileOutput } from "../outputs";

export const getProfile = queryField("getProfile", {
  type: GetProfileOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    try {
      const profile_id = args.where.profile_id;
      const profile = await ctx.prisma.profile.findUnique({
        where: {
          id: profile_id,
        },
        include: {
          user: true,
        },
      });

      if (!profile)
        return {
          IOutput: {
            code: 400,
            success: false,
            message: "Profile is not found",
          },
        };

      return {
        IOutput: {
          code: 200,
          success: true,
          message: "Query is done",
        },
        Profile: profile,
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

export const getManyProfiles = queryField("getManyProfiles", {
  type: GetManyProfilesOutput,
  args: {
    where: nonNull(GetManyProfilesInput),
  },
  resolve: async (_root, args, ctx) => {
    try {
      const { search_input } = args.where;
      const profiles = await ctx.prisma.profile.findMany({
        where:
          search_input == null
            ? {}
            : {
                profile_interests: {
                  some: {
                    interest: {
                      interest_name: {
                        contains: search_input,
                        mode: "insensitive",
                      },
                    },
                  },
                },
              },
      });

      return {
        IOutput: {
          code: 200,
          success: true,
          message: "Query is done successfully",
        },
        Profile: profiles,
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
