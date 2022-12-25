import { objectType } from "nexus";
import { BuddyRequest, PageInfoIDCursor } from "../objects";
import { IOutput } from "./IOutput";

export const CreateBuddyRequestOutput = objectType({
  name: "CreateBuddyRequestOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });
    t.nullable.field("buddy_request", {
      type: BuddyRequest,
    });
  },
});

export const GetManyBuddyRequestsOutput = objectType({
  name: "GetManyBuddyRequestsOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });
    t.nullable.list.nonNull.field("buddy_requests", {
      type: BuddyRequest,
    });

    t.nullable.field("BuddyRequestPageInfo", {
      type: PageInfoIDCursor,
    });
  },
});
