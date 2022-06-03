import { enumType } from "nexus";

export const RelationshipStatusCode = enumType({
  name: "RelationshipStatusCode",
  members: ["REQUESTED", "ACCEPTED", "DECLINED"],
});
