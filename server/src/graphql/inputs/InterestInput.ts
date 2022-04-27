import { inputObjectType } from "nexus";

export const CreateInterestInput = inputObjectType({
  name: "CreateInterestInput",
  definition(t) {
    t.nonNull.string("interest_name");
  },
});

export const getManyInterestsInput = inputObjectType({
  name: "getManyInterestsInput",
  definition(t) {
    t.nullable.string("search_input");
  },
});
