import { objectType } from "nexus";
import { Notification } from "../objects/Notification";
import { IOutput } from "./IOutput";

export const NotificationMutationOutput = objectType({
  name: "NotificationMutationOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });
  },
});

export const GetNotificationOutput = objectType({
  name: "GetNotificationOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });
    t.nullable.list.nullable.field("notifications", {
      type: Notification,
    });
  },
});
