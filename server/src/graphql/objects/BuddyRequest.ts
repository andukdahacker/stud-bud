import { objectType } from "nexus";
import { Profile } from "./Profile";
import { Purpose } from "./Purpose";
import { PurposeType } from "./PurposeType";

export const BuddyRequest = objectType({
  name: "BuddyRequest",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("description");
    t.nonNull.string("buddy_requester_id");
    t.nonNull.field("buddy_requester", {
      type: Profile,
      resolve: async (root, _args, ctx) => {
        const profile = await ctx.prisma.profile.findUniqueOrThrow({
          where: {
            id: root.buddy_requester_id,
          },
        });

        return profile;
      },
    });
    t.nonNull.string("purpose_id");
    t.nonNull.field("purpose", {
      type: Purpose,
      resolve: async (root, _args, ctx) => {
        const purpose = await ctx.prisma.purpose.findUniqueOrThrow({
          where: {
            id: root.purpose_id,
          },
        });

        return purpose;
      },
    });

    t.nonNull.string("purpose_type_id");
    t.nonNull.field("purpose_type", {
      type: PurposeType,
      resolve: async (root, _args, ctx) => {
        const purpose_type = await ctx.prisma.purposeType.findUniqueOrThrow({
          where: {
            id: root.purpose_type_id,
          },
        });

        return purpose_type;
      },
    });

    t.nullable.json("extended_buddy_request_data");
  },
});
