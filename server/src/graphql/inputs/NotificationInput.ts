import { inputObjectType } from "nexus";

export const NotificationInput = inputObjectType({
  name: "NotificationInput",
  definition(t) {
    t.nonNull.string("receiver_id");
  },
});
