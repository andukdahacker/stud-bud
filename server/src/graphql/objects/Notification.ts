import { objectType } from "nexus";
import { NotificationType } from "../enums";

export const Notification = objectType({
  name: "Notification",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("notifier_id");
    t.nonNull.string("receiver_id");
    t.nonNull.field("type", {
      type: NotificationType,
    });
    t.nonNull.string("message");
    t.nullable.string("entity_id");
    t.nonNull.date("createdAt");
  },
});
