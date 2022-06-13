import { objectType } from "nexus";
import { Notification } from "../objects/Notification";
import { IOutput } from "./IOutput";

export const NotificationOutput = objectType({
  name: "NotificationOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });
    t.nullable.list.nonNull.field("Notifications", {
      type: Notification,
    });
    t.nullable.list.nonNull.field("BuddyNotifications", {
      type: Notification,
    });
  },
});
