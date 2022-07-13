import { nonNull, queryField } from "nexus";
import {
  INTERNAL_SERVER_ERROR,
  QUERY_SUCCESS,
  UNSUCCESSFUL_QUERY,
} from "../../constants";
import { GetRelationshipInput, ProfileWhereUniqueInput } from "../inputs";

import { BuddyNotificationsOutput, GetRelationshipOutput } from "../outputs";

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
