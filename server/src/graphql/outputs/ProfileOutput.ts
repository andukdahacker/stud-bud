import { objectType } from "nexus";
import { Education, Profile, WorkExperience } from "../objects";
import { PageInfoDateCursor } from "../objects/dev";
import { IOutput } from "./IOutput";

export const ProfileMutationOutput = objectType({
  name: "ProfileMutationOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });
    t.nullable.field("Profile", {
      type: Profile,
    });
  },
});

export const GetManyProfilesOutput = objectType({
  name: "GetManyProfilesOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });
    t.nullable.list.nullable.field("Profile", {
      type: Profile,
    });
    t.nullable.field("PageInfo", {
      type: PageInfoDateCursor,
    });
  },
});

export const UpsertWorkExperienceOutput = objectType({
  name: "UpsertWorkExperienceOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });
    t.nullable.field("work_experience", {
      type: WorkExperience,
    });
  },
});

export const UpsertEducationOutput = objectType({
  name: "UpsertEducationOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });
    t.nullable.field("education", {
      type: Education,
    });
  },
});
