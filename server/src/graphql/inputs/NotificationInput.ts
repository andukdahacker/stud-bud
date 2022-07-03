import { inputObjectType } from "nexus";

export const NotificationWhereUniqueInput = inputObjectType({
  name: "NotificationWhereUniqueInput",
  definition(t) {
    t.nonNull.string("id");
  },
});

export const CreateNotificationInput = inputObjectType({
  name: "CreateNotificationInput",
  definition(t) {
    t.nonNull.string("notifier_id");
    t.nonNull.list.nonNull.string("receiver_id");
    t.nonNull.string("entity_id");
    t.nonNull.int("type_id");
  },
});
