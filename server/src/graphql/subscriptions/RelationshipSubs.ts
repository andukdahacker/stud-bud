import { nonNull, subscriptionField } from "nexus";
import { Relationship } from "../../types";
import { pubsub } from ".";
import {
  ACCEPT_BUDDY_EVENT,
  CONNECT_BUDDY_EVENT,
  INTERNAL_SERVER_ERROR,
  QUERY_SUCCESS,
  UNSUCCESSFUL_QUERY,
} from "../../constants";
import { ProfileWhereUniqueInput } from "../inputs";
import { withFilter } from "graphql-subscriptions";
import { BuddyNotificationsOutput } from "../outputs";
import { RelationshipStatusCode } from "@prisma/client";

export const connectBuddyEvent = subscriptionField("getBuddyNotifications", {
  type: BuddyNotificationsOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
  },
  subscribe: withFilter(
    () => pubsub.asyncIterator([CONNECT_BUDDY_EVENT, ACCEPT_BUDDY_EVENT]),
    (root: Relationship, args, _ctx) => {
      return root.data.addressee_id === args.where.profile_id;
    }
  ),
  resolve: async (root: Relationship, _args, ctx) => {
    try {
      const relationship = await ctx.prisma.relationship.findUnique({
        where: {
          requester_id_addressee_id: {
            requester_id: root.data.requester_id,
            addressee_id: root.data.addressee_id,
          },
        },
      });

      const countNotViewedBuddyNotifications =
        await ctx.prisma.relationship.count({
          where: {
            addressee_id: root.data.addressee_id,
            isViewed: false,
          },
        });

      if (!relationship)
        return {
          IOutput: UNSUCCESSFUL_QUERY,
        };

      if (relationship.status === RelationshipStatusCode.REQUESTED) {
        return {
          IOutput: QUERY_SUCCESS,
          buddyRequests: [relationship],
          buddyAccepts: [],
          countNotViewedBuddyNotifications,
        };
      }

      if (relationship.status === RelationshipStatusCode.ACCEPTED) {
        return {
          IOutput: QUERY_SUCCESS,
          buddyRequests: [],
          buddyAccepts: [relationship],
          countNotViewedBuddyNotifications,
        };
      }

      return null;
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});
