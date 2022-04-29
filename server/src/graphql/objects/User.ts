import { objectType } from "nexus";
import { Profile } from "./Profile";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("username");
    t.nonNull.string("email");
    t.nullable.field("profile", {
      type: Profile,
      resolve: async (root, _args, ctx) => {
        return ctx.prisma.user
          .findUnique({
            where: { id: root.id },
          })
          .profile();
      },
    });
    t.nonNull.boolean("isVerified");
  },
});
