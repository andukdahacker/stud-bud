import { objectType } from "nexus";
import { ProfileInterest } from "./ProfileInterest";
import { Relationship } from "./Relationship";

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
    t.nonNull.boolean("tutor_mode");
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
    t.nullable.list.nonNull.field("buddies", {
      type: Relationship,
      resolve: async (root, _args, ctx) => {
        return await ctx.prisma.relationship.findMany({
          where: {
            requester_id: root.id,
            status: "ACCEPTED",
          },
        });
      },
    });
    t.nullable.list.nonNull.field("buddyRequests", {
      type: Relationship,
      resolve: async (root, _args, ctx) => {
        return await ctx.prisma.relationship.findMany({
          where: {
            addressee_id: root.id,
            status: "REQUESTED",
          },
        });
      },
    });
    t.nullable.list.nonNull.field("buddyPendings", {
      type: Relationship,
      resolve: async (root, _args, ctx) => {
        return await ctx.prisma.relationship.findMany({
          where: {
            requester_id: root.id,
            status: "REQUESTED",
          },
        });
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
