import { enumType } from "nexus";

export const RelationshipStatusCode = enumType({
  name: "RelationshipStatusCode",
  members: ["REQUESTED", "ACCEPTED", "DECLINED"],
});

export const TutorOrderTutorConnectStatusCode = enumType({
  name: "TutorOrderTutorConnectStatusCode",
  members: ["REQUESTED", "ACCEPTED", "DECLINED"],
});
