import { nullable, queryField } from "nexus";
import { User } from "../objects";

export const getUserQuery = queryField("getUser", {
  type: nullable(User),
  resolve: async (_root, _args, ctx) => {
    const userId = ctx.req.session.userId;
    if (!userId) return null;

    const user = await ctx.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        profile: true,
      },
    });

    return user;
  },
});
