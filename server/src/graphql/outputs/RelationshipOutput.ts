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
    t.nullable.list.nonNull.field("Relationship", {
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
