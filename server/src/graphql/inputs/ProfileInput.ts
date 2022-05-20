import { inputObjectType } from "nexus";
import { CreateInterestInput } from "./InterestInput";

export const CreateProfileInput = inputObjectType({
  name: "CreateProfileInput",
  definition(t) {
    t.nullable.string("profile_bio");
    t.nullable.upload("profile_avatar");
    t.nullable.upload("profile_wallpaper");
    t.nonNull.list.nullable.field("profile_interest", {
      type: CreateInterestInput,
    });
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
