import { TutorOrder } from "@prisma/client";
import { nonNull, queryField } from "nexus";
import {
  INTERNAL_SERVER_ERROR,
  QUERY_SUCCESS,
  UNSUCCESSFUL_QUERY,
} from "../../constants";
import {
  GetManyTutorOrdersInput,
  ProfileWhereUniqueInput,
  TutorOrderWhereUniqueInput,
} from "../inputs";
import {
  GetManyTutorOrdersOutput,
  GetManyTutorOrderTutorConnectOutput,
  GetTutorOrderTutorConnectOutput,
  TutorOrderOutput,
} from "../outputs";

export const getMyTutorOrder = queryField("getMyTutorOrder", {
  type: GetManyTutorOrdersOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    const { profile_id } = args.where;

    try {
      const tutor_orders = await ctx.prisma.tutorOrder.findMany({
        where: {
          student_id: profile_id,
        },
      });

      if (!tutor_orders)
        return {
          IOutput: UNSUCCESSFUL_QUERY,
        };

      return {
        IOutput: QUERY_SUCCESS,
        tutor_order: tutor_orders,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const getTutorOrder = queryField("getTutorOrder", {
  type: TutorOrderOutput,
  args: {
    where: nonNull(TutorOrderWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    const { id } = args.where;
    try {
      const tutor_order = await ctx.prisma.tutorOrder.findUnique({
        where: {
          id,
        },
      });

      if (!tutor_order)
        return {
          IOutput: UNSUCCESSFUL_QUERY,
        };

      return {
        IOutput: QUERY_SUCCESS,
        tutor_order,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const getManyTutorOrders = queryField("getManyTutorOrders", {
  type: GetManyTutorOrdersOutput,
  args: {
    where: nonNull(GetManyTutorOrdersInput),
  },
  resolve: async (_root, args, ctx) => {
    const { search_input, take, cursor } = args.where;
    try {
      let queryResult: TutorOrder[] | null = null;

      if (cursor) {
        queryResult = await ctx.prisma.tutorOrder.findMany({
          take,
          where:
            search_input == null
              ? {
                  tutor_id: null,
                }
              : {
                  tutor_id: null,
                  OR: [
                    {
                      student: {
                        user: {
                          username: {
                            contains: search_input,
                            mode: "insensitive",
                          },
                        },
                      },
                    },
                    {
                      tutor_order_interests: {
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
                  ],
                },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        queryResult = await ctx.prisma.tutorOrder.findMany({
          take,
          where:
            search_input == null
              ? {
                  tutor_id: null,
                }
              : {
                  tutor_id: null,
                  OR: [
                    {
                      student: {
                        user: {
                          username: {
                            contains: search_input,
                            mode: "insensitive",
                          },
                        },
                      },
                    },
                    {
                      tutor_order_interests: {
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
                  ],
                },
          orderBy: {
            createdAt: "desc",
          },
        });
      }

      if (queryResult.length > 0) {
        const lastTutorOrderInResults = queryResult[queryResult.length - 1];
        const myCursor = lastTutorOrderInResults.id;
        const secondQueryResults = await ctx.prisma.tutorOrder.findMany({
          take,
          skip: 1,
          cursor: {
            id: myCursor,
          },
          where:
            search_input == null
              ? {
                  tutor_id: null,
                }
              : {
                  tutor_id: null,
                  OR: [
                    {
                      student: {
                        user: {
                          username: {
                            contains: search_input,
                            mode: "insensitive",
                          },
                        },
                      },
                    },
                    {
                      tutor_order_interests: {
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
                  ],
                },
          orderBy: {
            createdAt: "desc",
          },
        });
        if (secondQueryResults.length > 0)
          return {
            IOutput: QUERY_SUCCESS,
            tutor_order: queryResult,
            PageInfoIDCursor: {
              hasNextPage: true,
              endCursor: myCursor,
              lastTake: secondQueryResults.length,
            },
          };

        return {
          IOutput: QUERY_SUCCESS,
          tutor_order: queryResult,
          PageInfoIDCursor: {
            hasNextPage: false,
            endCursor: null,
            lastTake: null,
          },
        };
      }

      return {
        IOutput: QUERY_SUCCESS,
        tutor_order: queryResult,
        PageInfoIDCursor: {
          hasNextPage: false,
          endCursor: null,
          lastTake: null,
        },
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const getTutorOrderTutorConnect = queryField(
  "getTutorOrderTutorConnect",
  {
    type: GetTutorOrderTutorConnectOutput,
    args: {
      where_1: nonNull(ProfileWhereUniqueInput),
      where_2: nonNull(TutorOrderWhereUniqueInput),
    },
    resolve: async (_root, args, ctx) => {
      const { profile_id: tutor_id } = args.where_1;
      const { id: tutor_order_id } = args.where_2;
      try {
        const tutor_order_tutor_connect =
          await ctx.prisma.tutorOrderTutorConnect.findUnique({
            where: {
              tutor_id_tutor_order_id: {
                tutor_id,
                tutor_order_id,
              },
            },
          });

        return {
          IOutput: QUERY_SUCCESS,
          tutor_order_tutor_connect,
        };
      } catch (error) {
        return INTERNAL_SERVER_ERROR;
      }
    },
  }
);

export const getManyTutorOrderRequests = queryField(
  "getManyTutorOrderRequests",
  {
    type: GetManyTutorOrderTutorConnectOutput,
    args: {
      where: nonNull(TutorOrderWhereUniqueInput),
    },
    resolve: async (_root, args, ctx) => {
      const { id } = args.where;
      try {
        const tutor_order_tutor_connect =
          await ctx.prisma.tutorOrderTutorConnect.findMany({
            where: {
              tutor_order_id: id,
            },
          });

        if (!tutor_order_tutor_connect)
          return {
            IOutput: UNSUCCESSFUL_QUERY,
          };

        return {
          IOutput: QUERY_SUCCESS,
          tutor_order_tutor_connect,
        };
      } catch (error) {
        return INTERNAL_SERVER_ERROR;
      }
    },
  }
);
