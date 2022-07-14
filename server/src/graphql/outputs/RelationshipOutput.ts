import { objectType } from "nexus";
import { PageInfoIDCursor } from "../objects";
import { Relationship } from "../objects/Relationship";
import { IOutput } from "./IOutput";

export const RelationshipOutput = objectType({
  name: "RelationshipOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });
    t.nullable.field("relationship", {
      type: Relationship,
    });
    t.nullable.field("otherEndRelationship", {
      type: Relationship,
    });
  },
});

export const BuddyNotificationsOutput = objectType({
  name: "BuddyNotificationOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });

    t.nullable.list.nonNull.field("buddyRequests", {
      type: Relationship,
    });

    t.nullable.list.nonNull.field("buddyAccepts", {
      type: Relationship,
    });
    t.nullable.int("countNotViewedBuddyNotifications");
    t.nullable.field("PageInfo", {
      type: PageInfoIDCursor,
    });
  },
});

export const GetRelationshipOutput = objectType({
  name: "GetRelationshipOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });

    t.nullable.field("relationship", {
      type: Relationship,
    });

    t.nullable.field("otherEndRelationship", {
      type: Relationship,
    });
  },
});
