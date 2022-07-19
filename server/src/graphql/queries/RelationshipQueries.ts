import { Relationship } from "@prisma/client";
import { nonNull, queryField } from "nexus";
import {
  INTERNAL_SERVER_ERROR,
  QUERY_SUCCESS,
  UNSUCCESSFUL_QUERY,
} from "../../constants";
import {
  GetMyBuddiesInput,
  GetRelationshipInput,
  ProfileWhereUniqueInput,
} from "../inputs";

import {
  BuddyNotificationsOutput,
  GetMyBuddiesOutput,
  GetRelationshipOutput,
} from "../outputs";

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

      const countNotViewedBuddyNotifications =
        await ctx.prisma.relationship.count({
          where: {
            addressee_id: profile_id,
            isViewed: false,
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
        countNotViewedBuddyNotifications,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const getRelationship = queryField("getRelationship", {
  type: GetRelationshipOutput,
  args: {
    where: nonNull(GetRelationshipInput),
  },
  resolve: async (_root, args, ctx) => {
    const { requester_id, addressee_id } = args.where;
    try {
      const relationship = await ctx.prisma.relationship.findUnique({
        where: {
          requester_id_addressee_id: {
            requester_id,
            addressee_id,
          },
        },
      });

      const otherEndRelationship = await ctx.prisma.relationship.findUnique({
        where: {
          requester_id_addressee_id: {
            requester_id: addressee_id,
            addressee_id: requester_id,
          },
        },
      });

      return {
        IOutput: QUERY_SUCCESS,
        relationship,
        otherEndRelationship,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const getMyBuddies = queryField("getMyBuddies", {
  type: GetMyBuddiesOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
    input: nonNull(GetMyBuddiesInput),
  },
  resolve: async (_root, args, ctx) => {
    const { profile_id } = args.where;
    const { search_input, take, requester_id, addressee_id } = args.input;
    try {
      let queryResult: Relationship[] | null = null;
      if (requester_id && addressee_id) {
        queryResult = await ctx.prisma.relationship.findMany({
          take,
          skip: 1,
          cursor: {
            requester_id_addressee_id: {
              requester_id,
              addressee_id,
            },
          },
          where:
            search_input == null
              ? { requester_id: profile_id, status: "ACCEPTED" }
              : {
                  requester_id: profile_id,
                  status: "ACCEPTED",
                  addressee: {
                    OR: [
                      {
                        user: {
                          username: {
                            contains: search_input,
                            mode: "insensitive",
                          },
                        },
                      },
                      {
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
                    ],
                  },
                },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        queryResult = await ctx.prisma.relationship.findMany({
          take,
          where:
            search_input == null
              ? {
                  requester_id: profile_id,
                  status: "ACCEPTED",
                }
              : {
                  requester_id: profile_id,
                  status: "ACCEPTED",
                  addressee: {
                    OR: [
                      {
                        user: {
                          username: {
                            contains: search_input,
                            mode: "insensitive",
                          },
                        },
                      },
                      {
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
                    ],
                  },
                },
          orderBy: {
            createdAt: "desc",
          },
        });
      }

      if (queryResult?.length > 0) {
        const lastRelationshipInResult = queryResult[queryResult.length - 1];

        const myCursor = {
          requester_id: lastRelationshipInResult.requester_id,
          addressee_id: lastRelationshipInResult.addressee_id,
        };

        const secondQueryResult = await ctx.prisma.relationship.findMany({
          take,
          skip: 1,
          cursor: {
            requester_id_addressee_id: {
              requester_id: myCursor.requester_id,
              addressee_id: myCursor.addressee_id,
            },
          },
          where:
            search_input == null
              ? {
                  requester_id: profile_id,
                  status: "ACCEPTED",
                }
              : {
                  requester_id: profile_id,
                  status: "ACCEPTED",
                  addressee: {
                    OR: [
                      {
                        user: {
                          username: {
                            contains: search_input,
                            mode: "insensitive",
                          },
                        },
                      },
                      {
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
                    ],
                  },
                },
        });

        if (secondQueryResult.length > 0)
          return {
            IOutput: QUERY_SUCCESS,
            relationships: queryResult,
            PageInfo: {
              endCursor: {
                id_1: myCursor.requester_id,
                id_2: myCursor.addressee_id,
              },
              hasNextPage: true,
              lastTake: secondQueryResult.length,
            },
          };
      }

      return {
        IOutput: QUERY_SUCCESS,
        relationships: queryResult,
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

export const getMyBuddiesRequests = queryField("getMyBuddiesRequests", {
  type: GetMyBuddiesOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
    input: nonNull(GetMyBuddiesInput),
  },
  resolve: async (_root, args, ctx) => {
    const { profile_id } = args.where;
    const { requester_id, addressee_id, take, search_input } = args.input;
    try {
      let queryResult: Relationship[] | null = null;
      if (requester_id && addressee_id) {
        queryResult = await ctx.prisma.relationship.findMany({
          take,
          skip: 1,
          where:
            search_input == null
              ? {
                  addressee_id: profile_id,
                  status: "REQUESTED",
                }
              : {
                  addressee_id: profile_id,
                  status: "REQUESTED",
                  requester: {
                    OR: [
                      {
                        user: {
                          username: {
                            contains: search_input,
                            mode: "insensitive",
                          },
                        },
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
                    ],
                  },
                },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        queryResult = await ctx.prisma.relationship.findMany({
          take,
          where:
            search_input == null
              ? {
                  addressee_id: profile_id,
                  status: "REQUESTED",
                }
              : {
                  addressee_id: profile_id,
                  status: "REQUESTED",
                  requester: {
                    OR: [
                      {
                        user: {
                          username: {
                            contains: search_input,
                            mode: "insensitive",
                          },
                        },
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
                    ],
                  },
                },
          orderBy: {
            createdAt: "desc",
          },
        });
      }

      if (queryResult.length > 0) {
        const lastRelationshipInResult = queryResult[queryResult.length - 1];
        const myCursor = {
          requester_id: lastRelationshipInResult.requester_id,
          addressee_id: lastRelationshipInResult.addressee_id,
        };

        const secondQueryResult = await ctx.prisma.relationship.findMany({
          take,
          skip: 1,
          cursor: {
            requester_id_addressee_id: {
              requester_id: myCursor.requester_id,
              addressee_id: myCursor.addressee_id,
            },
          },
          where:
            search_input == null
              ? {
                  addressee_id: profile_id,
                  status: "REQUESTED",
                }
              : {
                  addressee_id: profile_id,
                  status: "REQUESTED",
                  requester: {
                    OR: [
                      {
                        user: {
                          username: {
                            contains: search_input,
                            mode: "insensitive",
                          },
                        },
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
                    ],
                  },
                },
          orderBy: {
            createdAt: "desc",
          },
        });

        if (secondQueryResult.length > 0) {
          return {
            IOutput: QUERY_SUCCESS,
            relationships: queryResult,
            PageInfo: {
              endCursor: {
                id_1: myCursor.requester_id,
                id_2: myCursor.addressee_id,
              },
              hasNextPage: true,
              lastTake: secondQueryResult.length,
            },
          };
        }
      }

      return {
        IOutput: QUERY_SUCCESS,
        relationships: queryResult,
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
