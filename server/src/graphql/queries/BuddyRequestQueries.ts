import { BuddyRequest } from "@prisma/client";
import { nonNull, queryField } from "nexus";
import { INTERNAL_SERVER_ERROR, QUERY_SUCCESS } from "../../constants";
import {
  GetManyBuddyRequestsInput,
  GetMyBuddyRequestsInput,
  GetSuggestedBuddyRequestsInput,
} from "../inputs";
import { GetManyBuddyRequestsOutput } from "../outputs";

export const getManyBuddyRequests = queryField("getManyBuddyRequests", {
  type: GetManyBuddyRequestsOutput,
  args: {
    where: nonNull(GetManyBuddyRequestsInput),
  },
  resolve: async (_root, args, ctx) => {
    try {
      const { search_query, take, cursor } = args.where;
      const user_id = ctx.req.session.userId;
      let queryResult: BuddyRequest[] | null = null;

      if (cursor) {
        queryResult = await ctx.prisma.buddyRequest.findMany({
          take,
          skip: 1,
          cursor: {
            id: cursor,
          },
          where: {
            NOT: {
              buddy_requester: {
                user_id,
              },
            },
            purpose_type: {
              purpose_type_name: {
                contains: search_query,
                mode: "insensitive",
              },
            },
          },
        });
      } else {
        queryResult = await ctx.prisma.buddyRequest.findMany({
          take,
          where: {
            NOT: {
              buddy_requester: {
                user_id,
              },
            },
            purpose_type: {
              purpose_type_name: {
                contains: search_query,
                mode: "insensitive",
              },
            },
          },
        });
      }

      if (queryResult.length > 0) {
        const lastResult = queryResult[queryResult.length - 1];
        const myCursor = lastResult.id;
        const secondQueryResults = await ctx.prisma.buddyRequest.findMany({
          take,
          skip: 1,
          cursor: {
            id: myCursor,
          },
          where: {
            NOT: {
              buddy_requester: {
                user_id,
              },
            },
            purpose_type: {
              purpose_type_name: {
                contains: search_query,
                mode: "insensitive",
              },
            },
          },
        });

        if (secondQueryResults.length > 0) {
          return {
            IOutput: QUERY_SUCCESS,
            buddy_requests: queryResult,
            BuddyRequestPageInfo: {
              endCursor: myCursor,
              lastTake:
                secondQueryResults.length < take
                  ? secondQueryResults.length
                  : take,
              hasNextPage: true,
            },
          };
        }
      }

      return {
        IOutput: QUERY_SUCCESS,
        buddy_requests: queryResult,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const getMyBuddyRequests = queryField("getMyBuddyRequests", {
  type: GetManyBuddyRequestsOutput,
  args: {
    input: nonNull(GetMyBuddyRequestsInput),
  },
  resolve: async (_root, args, ctx) => {
    try {
      const { search_query, take, cursor } = args.input;
      const user_id = ctx.req.session.userId;

      let queryResult: BuddyRequest[] | null = null;

      if (cursor) {
        queryResult = await ctx.prisma.buddyRequest.findMany({
          take,
          skip: 1,
          cursor: {
            id: cursor,
          },
          where: {
            buddy_requester: {
              user_id,
            },
            purpose_type: {
              purpose_type_name: {
                contains: search_query,
                mode: "insensitive",
              },
            },
          },
        });
      } else {
        queryResult = await ctx.prisma.buddyRequest.findMany({
          take,
          where: {
            buddy_requester: {
              user_id,
            },
            purpose_type: {
              purpose_type_name: {
                contains: search_query,
                mode: "insensitive",
              },
            },
          },
        });
      }

      if (queryResult.length > 0) {
        const lastResult = queryResult[queryResult.length - 1];
        const myCursor = lastResult.id;

        const secondQueryResults = await ctx.prisma.buddyRequest.findMany({
          take,
          skip: 1,
          cursor: {
            id: myCursor,
          },
          where: {
            buddy_requester: {
              user_id,
            },
            purpose_type: {
              purpose_type_name: {
                contains: search_query,
                mode: "insensitive",
              },
            },
          },
        });

        if (secondQueryResults.length > 0) {
          return {
            IOutput: QUERY_SUCCESS,
            buddy_requests: queryResult,
            BuddyRequestPageInfo: {
              endCursor: myCursor,
              hasNextPage: true,
              lastTake:
                secondQueryResults.length < take
                  ? secondQueryResults.length
                  : take,
            },
          };
        }
      }

      return {
        IOutput: QUERY_SUCCESS,
        buddy_requests: queryResult,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const getSuggestedBuddyRequests = queryField(
  "getSuggestedBuddyRequests",
  {
    type: GetManyBuddyRequestsOutput,
    args: {
      where: nonNull(GetSuggestedBuddyRequestsInput),
    },
    resolve: async (_root, args, ctx) => {
      try {
        const { purpose_name, purpose_type_name, take, cursor } = args.where;
        const user_id = ctx.req.session.userId;

        let queryResult: BuddyRequest[] | null = null;
        if (cursor) {
          queryResult = await ctx.prisma.buddyRequest.findMany({
            take,
            skip: 1,
            cursor: {
              id: cursor,
            },
            where: {
              NOT: {
                buddy_requester: {
                  user_id,
                },
              },
              OR: {
                purpose: {
                  purpose_name: { in: purpose_name },
                },
                purpose_type: {
                  purpose_type_name: { in: purpose_type_name },
                },
              },
            },
          });
        } else {
          queryResult = await ctx.prisma.buddyRequest.findMany({
            take,
            where: {
              NOT: {
                buddy_requester: {
                  user_id,
                },
              },
              OR: {
                purpose: {
                  purpose_name: { in: purpose_name },
                },
                purpose_type: {
                  purpose_type_name: { in: purpose_type_name },
                },
              },
            },
          });
        }

        if (queryResult.length > 0) {
          const lastResult = queryResult[queryResult.length - 1];
          const myCursor = lastResult.id;
          const secondQueryResults = await ctx.prisma.buddyRequest.findMany({
            take,
            skip: 1,
            cursor: {
              id: myCursor,
            },
            where: {
              NOT: {
                buddy_requester: {
                  user_id,
                },
              },
              OR: {
                purpose: {
                  purpose_name: { in: purpose_name },
                },
                purpose_type: {
                  purpose_type_name: { in: purpose_type_name },
                },
              },
            },
          });

          if (secondQueryResults.length > 0) {
            return {
              IOutput: QUERY_SUCCESS,
              buddy_requests: queryResult,
              BuddyRequestPageInfo: {
                endCursor: myCursor,
                hasNextPage: true,
                lastTake:
                  secondQueryResults.length < take
                    ? secondQueryResults.length
                    : take,
              },
            };
          }
        }

        return {
          IOutput: QUERY_SUCCESS,
          buddy_requests: queryResult,
        };
      } catch (error) {
        return INTERNAL_SERVER_ERROR;
      }
    },
  }
);
