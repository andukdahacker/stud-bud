import { objectType } from "nexus";

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
    t.nonNull.boolean("isRead");
    t.nonNull.date("createdAt");
  },
});

export const NotificationType = objectType({
  name: "NotificationType",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("main_type");
    t.nonNull.string("sub_type");
  },
});
