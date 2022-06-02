import { enumType } from "nexus";

export const RelationshipStatusCode = enumType({
  name: "RelationshipStatusCode",
  members: ["REQUESTED", "ACCEPTED", "DECLINED"],
});

export const NotificationType = enumType({
  name: "NotificationType",
  members: [
    "RELATIONSHIP_REQUEST",
    "RELATIONSHIP_ACCEPT",
    "POST_CREATED",
    "COMMENT_CREATED",
    "POST_LIKED",
    "COMMENT_LIKED",
    "USER",
    "ADMIN",
  ],
});
