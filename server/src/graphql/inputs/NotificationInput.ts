import { inputObjectType } from "nexus";

export const NotificationWhereUniqueInput = inputObjectType({
  name: "NotificationInput",
  definition(t) {
    t.nonNull.string("id");
  },
});
