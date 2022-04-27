import { objectType } from "nexus";
import { Profile } from "../objects";
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

export const GetProfileOutput = objectType({
  name: "GetProfileOutput",
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
  },
});
