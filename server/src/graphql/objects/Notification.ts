import { objectType } from "nexus";
import { Profile } from "./Profile";

export const Notification = objectType({
  name: "Notification",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("notifier_id");
    t.nonNull.field("notifier", {
      type: Profile,
      resolve: async (root, _args, ctx) => {
        return await ctx.prisma.profile.findUnique({
          where: {
            id: root.notifier_id,
          },
          rejectOnNotFound: true,
        });
      },
    });
    t.nonNull.string("receiver_id");
    t.nonNull.int("type_id");
    t.nullable.string("message");
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
