import { objectType } from "nexus";
import { RelationshipStatusCode } from "../enums";
import { Profile } from "./Profile";

export const Relationship = objectType({
  name: "Relationship",
  definition(t) {
    t.nonNull.string("requester_id");
    t.nullable.field("requester", {
      type: Profile,
      resolve: async (root, _args, ctx) => {
        return await ctx.prisma.profile.findUnique({
          where: {
            id: root.requester_id,
          },
        });
      },
    });
    t.nonNull.string("addressee_id");
    t.nullable.field("addressee", {
      type: Profile,
      resolve: async (root, _args, ctx) => {
        return await ctx.prisma.profile.findUnique({
          where: {
            id: root.addressee_id,
          },
        });
      },
    });
    t.nonNull.string("specifier_id");
    t.nonNull.field("status", {
      type: RelationshipStatusCode,
    });
    t.nonNull.date("createdAt");
    t.nonNull.date("updatedAt");
  },
});
