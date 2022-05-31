import { inputObjectType } from "nexus";
import { RelationshipStatusCode } from "../enums";

export const RelationshipInput = inputObjectType({
  name: "RelationshipInput",
  definition(t) {
    t.nonNull.string("requester_id");
    t.nonNull.string("addressee_id");
    t.nullable.string("specifier_id");
    t.nullable.field("status", {
      type: RelationshipStatusCode,
    });
  },
});
