import { Profile } from "@prisma/client";
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
    const { search_input, cursor, take } = args.where;
    // const hashCursor = Buffer.from(cursor).toString("base64");
    // const decodeCursor = Buffer.from(hashCursor, "base64").toString();
    // console.log("cursor", cursor);
    // console.log("hashCursor", hashCursor);
    // console.log("decodeCursor", decodeCursor);
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
          IOutput: {
            code: 200,
            success: true,
            message: "Query is done successfully",
          },
          Profile: queryResult,
          PageInfo: {
            endCursor: myCursor,
            hasNextPage: secondQueryResults.length >= take,
          },
        };
      }
      return {
        IOutput: {
          code: 200,
          success: true,
          message: "Query is done successfully",
        },
        Profile: [],
        PageInfo: {
          endCursor: null,
          hasNextPage: false,
        },
      };
    } catch (error) {
      console.log(error);
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
