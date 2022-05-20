import { objectType } from "nexus";
import { ProfileInterest } from "./ProfileInterest";
import { User } from "./User";

export const Profile = objectType({
  name: "Profile",
  definition(t) {
    t.nonNull.id("id");
    t.nullable.string("profile_bio");
    t.nullable.string("profile_avatar");
    t.nullable.string("profile_avatar_public_id");
    t.nullable.string("profile_wallpaper");
    t.nullable.string("profile_wallpaper_public_id");
    t.nullable.list.nullable.field("profile_interests", {
      type: ProfileInterest,
      resolve: async (root, _args, ctx) => {
        return await ctx.prisma.profile
          .findUnique({
            where: {
              id: root.id,
            },
          })
          .profile_interests();
      },
    });
    t.nullable.date("createdAt");
    t.nullable.field("user", {
      type: User,
      resolve: async (root, _args, ctx) => {
        return await ctx.prisma.profile
          .findUnique({ where: { id: root.id }, rejectOnNotFound: true })
          .user();
      },
    });
  },
});

export const PageInfo = objectType({
  name: "PageInfo",
  definition(t) {
    t.date("endCursor");
    t.boolean("hasNextPage");
  },
});
