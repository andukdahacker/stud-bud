import { inputObjectType } from "nexus";
import { RelationshipStatusCode } from "../enums";

export const RelationshipInput = inputObjectType({
  name: "RelationshipInput",
  definition(t) {
    t.nonNull.string("requester_id");
    t.nonNull.string("addressee_id");
    t.nonNull.field("status", {
      type: RelationshipStatusCode,
    });
  },
});

export const ReadBuddyNotificationsInput = inputObjectType({
  name: "ReadBuddyNotificationsInput",
  definition(t) {
    t.nonNull.string("requester_id");
    t.nonNull.string("addressee_id");
  },
});
export const GetRelationshipInput = inputObjectType({
  name: "GetRelationshipInput",
  definition(t) {
    t.nonNull.string("requester_id");
    t.nonNull.string("addressee_id");
  },
});
