import { objectType } from "nexus";
import { Relationship } from "../objects/Relationship";
import { IOutput } from "./IOutput";

export const RelationshipOutput = objectType({
  name: "RelationshipOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });
    t.nullable.field("Relationship", {
      type: Relationship,
    });
  },
});
