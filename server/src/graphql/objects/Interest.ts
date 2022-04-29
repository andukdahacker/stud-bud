import { objectType } from "nexus";
import { ProfileInterest } from "./ProfileInterest";

export const Interest = objectType({
  name: "Interest",
  definition(t) {
    t.nonNull.id("id");
    t.string("interest_name");
    t.nonNull.list.nonNull.field("profile_interests", {
      type: ProfileInterest,
      resolve: async (root, _args, ctx) => {
        return await ctx.prisma.interest
          .findUnique({
            where: {
              id: root.id,
            },
          })
          .profile_interests();
      },
    });
  },
});
