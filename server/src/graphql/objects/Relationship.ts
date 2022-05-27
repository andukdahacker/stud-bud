import { objectType } from "nexus";
import { RelationshipStatusCode } from "../enums";

export const Relationship = objectType({
  name: "Relationship",
  definition(t) {
    t.nonNull.string("requester_id");
    t.nonNull.string("addressee_id");
    t.nonNull.string("specifier_id");
    t.nonNull.field("status", {
      type: RelationshipStatusCode,
    });
    t.nonNull.date("createdAt");
    t.nonNull.date("updatedAt");
  },
});
