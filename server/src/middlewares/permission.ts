import { allow, rule, shield } from "graphql-shield";
import { IRuleResult } from "graphql-shield/dist/types";
import { UNAUTHORISED } from "../constants";
import { Context } from "../context";

const rules = {
  isAuthenticatedUser: rule({ cache: "contextual" })(
    async (_parent, _args, ctx: Context, _info): Promise<IRuleResult> => {
      const userId = ctx.req.session.userId;

      if (!userId) {
        return new Error(UNAUTHORISED);
      } else {
        return true;
      }
    }
  ),
  isProfileOwner: rule()(
    async (_parent, args, ctx: Context): Promise<IRuleResult> => {
      const userId = ctx.req.session.userId;

      const profile = await ctx.prisma.user
        .findUnique({
          where: {
            id: userId,
          },
          rejectOnNotFound: true,
        })
        .profile();

      if (profile?.id === args.where.profile_id) {
        return true;
      }

      return new Error(UNAUTHORISED);
    }
  ),
};

export const middleware = shield({
  Query: {
    "*": rules.isAuthenticatedUser,
    getUser: allow,
    getProfile: allow,
    getManyInterests: allow,
    getManyProfiles: allow,
  },

  Mutation: {
    "*": rules.isAuthenticatedUser,
    register: allow,
    login: allow,
    logout: allow,
    updateProfile: rules.isProfileOwner,
    forgotPassword: allow,
    changePassword: allow,
    verifyEmail: allow,
  },
});
