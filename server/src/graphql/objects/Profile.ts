import { objectType } from "nexus";
import { Gender } from "../enums";
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
    t.nullable.date("birthday");
    t.nullable.int("location_id");
    t.nullable.field("location", {
      type: Location,
      resolve: async (root, _args, ctx) => {
        if (!root.location_id) return null;
        const location = await ctx.prisma.location.findUniqueOrThrow({
          where: {
            id: root.location_id,
          },
        });

        return location;
      },
    });

    t.nullable.list.nullable.field("work_experience", {
      type: WorkExperience,
      resolve: async (root, _args, ctx) => {
        const work_experience = await ctx.prisma.workExperience.findMany({
          where: {
            profile_id: root.id,
          },
        });

        return work_experience;
      },
    });

    t.nullable.list.nullable.field("education", {
      type: Education,
      resolve: async (root, _args, ctx) => {
        const education = await ctx.prisma.education.findMany({
          where: {
            profile_id: root.id,
          },
        });
        return education;
      },
    });
    t.nullable.field("gender", {
      type: Gender,
    });
    t.nonNull.boolean("tutor_mode");

    t.nullable.date("createdAt");

    t.nullable.field("user", {
      type: User,
      resolve: async (root, _args, ctx) => {
        return await ctx.prisma.profile
          .findUniqueOrThrow({ where: { id: root.id } })
          .user();
      },
    });
  },
});

export const Location = objectType({
  name: "Location",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("location_name");
  },
});

export const WorkExperience = objectType({
  name: "WorkExperience",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("workplace_name");
    t.nullable.string("work_position");
    t.nullable.string("work_description");
    t.nullable.string("logo");
    t.nullable.string("logo_public_id");
    t.nonNull.boolean("current");
    t.nullable.date("joined_at");
    t.nullable.date("left_at");
    t.nonNull.string("profile_id");
  },
});

export const Education = objectType({
  name: "Education",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("institution_name");
    t.nonNull.string("field_of_study");
    t.nullable.string("education_description");
    t.nullable.string("logo");
    t.nullable.string("logo_public_id");
    t.nonNull.boolean("current");
    t.nullable.date("joined_at");
    t.nullable.date("left_at");
  },
});
