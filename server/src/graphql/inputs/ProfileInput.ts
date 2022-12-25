import { inputObjectType } from "nexus";
import { Gender } from "../enums";

export const CreateProfileInput = inputObjectType({
  name: "CreateProfileInput",
  definition(t) {
    t.nullable.string("profile_bio");
    t.nullable.upload("profile_avatar");
    t.nullable.field("gender", {
      type: Gender,
    });
    t.nullable.string("location_name");
    t.nullable.date("birthday");
  },
});

export const updateIntroductionInput = inputObjectType({
  name: "updateIntroductionInput",
  definition(t) {
    t.nonNull.string("profile_bio");
  },
});

export const ProfileWhereUniqueInput = inputObjectType({
  name: "ProfileWhereUniqueInput",
  definition(t) {
    t.nonNull.id("profile_id");
  },
});

export const GetManyProfilesInput = inputObjectType({
  name: "GetManyProfilesInput",
  definition(t) {
    t.nullable.string("search_input");
    t.nonNull.int("take");
    t.nullable.date("cursor");
  },
});

export const DestroyImageInput = inputObjectType({
  name: "DestroyImageInput",
  definition(t) {
    t.nonNull.string("img_public_id");
  },
});

export const ChangeImageInput = inputObjectType({
  name: "ChangeImageInput",
  definition(t) {
    t.nonNull.upload("image_file");
  },
});

export const WorkExperienceInput = inputObjectType({
  name: "WorkExperienceInput",
  definition(t) {
    t.nonNull.string("workplace_name");
    t.nullable.string("work_position");
    t.nullable.string("work_description");
    t.nullable.upload("logo");
    t.nonNull.boolean("current");
    t.nullable.date("joined_at");
    t.nullable.date("left_at");
  },
});

export const UpsertWorkExperienceInput = inputObjectType({
  name: "UpsertWorkExperienceInput",
  definition(t) {
    t.nullable.string("id");
    t.nonNull.string("workplace_name");
    t.nullable.string("work_position");
    t.nullable.string("work_description");
    t.nullable.upload("logo");
    t.nonNull.boolean("current");
    t.nullable.date("joined_at");
    t.nullable.date("left_at");
  },
});

export const EducationInput = inputObjectType({
  name: "EducationInput",
  definition(t) {
    t.nonNull.string("institution_name");
    t.nonNull.string("field_of_study");
    t.nullable.string("education_description");
    t.nullable.boolean("current");
    t.nullable.date("joined_at");
    t.nullable.date("left_at");
  },
});

export const UpsertAgeLocationInput = inputObjectType({
  name: "UpsertAgeLocationInput",
  definition(t) {
    t.nonNull.date("birthday");
    t.nonNull.string("location_name");
  },
});

export const UpsertEducationInput = inputObjectType({
  name: "UpsertEducationInput",
  definition(t) {
    t.nullable.string("id");
    t.nonNull.string("institution_name");
    t.nonNull.string("field_of_study");
    t.nullable.string("education_description");
    t.nullable.upload("logo");
    t.nonNull.boolean("current");
    t.nullable.date("joined_at");
    t.nullable.date("left_at");
  },
});

export const WorkExperienceWhereUniqueInput = inputObjectType({
  name: "WorkExperienceWhereUniqueInput",
  definition(t) {
    t.nonNull.string("id");
  },
});

export const EducationWhereUniqueInput = inputObjectType({
  name: "EducationWhereUniqueInput",
  definition(t) {
    t.nonNull.string("id");
  },
});
