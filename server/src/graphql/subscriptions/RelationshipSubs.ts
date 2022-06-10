import { withFilter } from "graphql-subscriptions";
import { nonNull, subscriptionField } from "nexus";
import { Relationship } from "../../types";
import { pubsub } from ".";
import { CONNECT_BUDDY_EVENT } from "../../constants";
import { ProfileWhereUniqueInput } from "../inputs";

import { BuddyRequestsOutput } from "../outputs";

export const connectBuddyEvent = subscriptionField("getBuddyRequests", {
  type: BuddyRequestsOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
  },
  subscribe: withFilter(
    () => pubsub.asyncIterator([CONNECT_BUDDY_EVENT]),
    (root: Relationship, args, _ctx) => {
      return root.data.addressee_id === args.where.profile_id;
    }
  ),
  resolve: async (root: Relationship, _args, ctx) => {
    const relationship = await ctx.prisma.relationship.findUnique({
      where: {
        requester_id_addressee_id: {
          requester_id: root.data.requester_id,
          addressee_id: root.data.addressee_id,
        },
      },
    });

    if (!relationship)
      return {
        IOutput: {
          code: 400,
          success: false,
          message: "Nei",
        },
      };

    return {
      IOutput: {
        code: 200,
        success: true,
        message: "Yay",
      },
      Requests: [relationship],
    };
  },
});
