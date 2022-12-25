import { objectType } from "nexus";
import { Purpose, PurposeType } from "../objects";
import { IOutput } from "./IOutput";

export const getManyPurposesOutput = objectType({
  name: "GetManyPurposesOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: "IOutput",
    });
    t.nullable.list.nonNull.field("purposes", {
      type: Purpose,
    });
  },
});

export const createPurposeOutput = objectType({
  name: "createPurposeOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });
  },
});

export const UpdateProfilePurposesOutput = objectType({
  name: "UpdateProfilePurposesOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });
  },
});

export const GetManyPurposeTypesOutput = objectType({
  name: "GetManyPurposeTypesOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });
    t.nullable.list.nonNull.field("purpose_types", {
      type: PurposeType,
    });
  },
});

export const GetUniquePurposeType = objectType({
  name: "GetUniquePurposeType",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    }),
      t.nullable.field("purpose_type", {
        type: PurposeType,
      });
  },
});

export const CreatePurposeTypeOutput = objectType({
  name: "CreatePurposeTypeOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });

    t.nullable.field("purpose_type", {
      type: PurposeType,
    });
  },
});
