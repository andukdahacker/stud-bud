import { inputObjectType } from "nexus";

export const CreateBuddyRequestInput = inputObjectType({
  name: "CreateBuddyRequestInput",
  definition(t) {
    t.nonNull.string("profile_id");
    t.nonNull.string("purpose_name");
    t.nonNull.string("purpose_type_name");
    t.nonNull.json("extended_buddy_request_data");
    t.nonNull.string("description");
  },
});

export const GetManyBuddyRequestsInput = inputObjectType({
  name: "GetManyBuddyRequestsInput",
  definition(t) {
    t.nonNull.string("search_query");
    t.nonNull.int("take");
    t.nullable.string("cursor");
  },
});

export const GetMyBuddyRequestsInput = inputObjectType({
  name: "GetMyBuddyRequestsInput",
  definition(t) {
    t.nonNull.string("search_query");
    t.nonNull.int("take");
    t.nullable.string("cursor");
  },
});

export const BuddyRequestWhereUniqueInput = inputObjectType({
  name: "BuddyRequestWhereUniqueInput",
  definition(t) {
    t.nonNull.string("buddy_request_id");
  },
});

export const UpdateBuddyRequestInput = inputObjectType({
  name: "UpdateBuddyRequestInput",
  definition(t) {
    t.nonNull.string("purpose_name");
    t.nonNull.string("purpose_type_name");
    t.nonNull.json("extended_buddy_request_data");
    t.nonNull.string("description");
  },
});

export const GetSuggestedBuddyRequestsInput = inputObjectType({
  name: "GetSuggestedBuddyRequests",
  definition(t) {
    t.nonNull.list.nonNull.string("purpose_name");
    t.nonNull.list.nonNull.string("purpose_type_name");
    t.nullable.string("cursor");
    t.nonNull.int("take");
  },
});
