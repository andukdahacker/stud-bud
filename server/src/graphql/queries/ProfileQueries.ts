import { Profile } from "@prisma/client";
import { nonNull, queryField } from "nexus";
import { INTERNAL_SERVER_ERROR, QUERY_SUCCESS } from "../../constants";
import { GetManyProfilesInput, ProfileWhereUniqueInput } from "../inputs";
import { GetManyProfilesOutput, ProfileMutationOutput } from "../outputs";

export const getProfile = queryField("getProfile", {
  type: ProfileMutationOutput,
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
        IOutput: QUERY_SUCCESS,
        Profile: profile,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const getManyProfiles = queryField("getManyProfiles", {
  type: GetManyProfilesOutput,
  args: {
    where: nonNull(GetManyProfilesInput),
  },
  resolve: async (_root, args, ctx) => {
    const { search_input, cursor, take } = args.where;

    let queryResult: Profile[] | null = null;

    try {
      if (cursor) {
        queryResult = await ctx.prisma.profile.findMany({
          take,
          skip: 1,
          cursor: {
            createdAt: cursor,
          },
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
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        queryResult = await ctx.prisma.profile.findMany({
          take,
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
          orderBy: {
            createdAt: "desc",
          },
        });
      }

      if (queryResult?.length > 0) {
        const lastProfileInResults = queryResult[queryResult.length - 1];
        const myCursor = lastProfileInResults.createdAt;
        const secondQueryResults = await ctx.prisma.profile.findMany({
          take,
          skip: 1,
          cursor: {
            createdAt: myCursor,
          },
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
          orderBy: {
            createdAt: "desc",
          },
        });
        return {
          IOutput: QUERY_SUCCESS,
          Profile: queryResult,
          PageInfo: {
            endCursor: myCursor,
            hasNextPage: secondQueryResults.length >= take,
          },
        };
      }
      return {
        IOutput: QUERY_SUCCESS,
        Profile: [],
        PageInfo: {
          endCursor: null,
          hasNextPage: false,
        },
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});
