import { inputObjectType } from "nexus";

export const getManyPurposesInput = inputObjectType({
  name: "GetManyPurposesInput",
  definition(t) {
    t.nonNull.string("purpose_name");
  },
});

export const createPurposeInput = inputObjectType({
  name: "CreatePurposeInput",
  definition(t) {
    t.nonNull.string("purpose_name");
    t.nonNull.string("purpose_description");
    t.nonNull.list.nonNull.field("purpose_type", {
      type: CreatePurposeTypeInput,
    });
  },
});

export const CreatePurposeTypeInput = inputObjectType({
  name: "CreatePurposeTypeInput",
  definition(t) {
    t.nonNull.string("purpose_type_name");
    t.nonNull.string("purpose_type_description");
    t.nonNull.string("purpose_name");
  },
});

export const updateProfilePurposeInput = inputObjectType({
  name: "UpdateProfilePurposesInput",
  definition(t) {
    t.nonNull.string("profile_id");
  },
});

export const GetManyPurposeTypesInput = inputObjectType({
  name: "GetManyPurposeTypesInput",
  definition(t) {
    t.nonNull.string("purpose_type");
    t.nonNull.boolean("partial");
  },
});

export const GetUniquePurposeTypeInput = inputObjectType({
  name: "GetUniquePurposeTypeInput",
  definition(t) {
    t.nonNull.string("purpose_type_name");
  },
});
