import { inputObjectType } from "nexus";
import { CreateInterestInput } from "./InterestInput";

export const CreateTutorOrderInput = inputObjectType({
  name: "CreateTutorOrderInput",
  definition(t) {
    t.nonNull.string("student_id");
    t.nullable.string("tutor_id");
    t.nonNull.list.nullable.field("tutor_order_interests", {
      type: CreateInterestInput,
    });
    t.nonNull.string("problem");
    t.nonNull.string("tutor_requirements");
  },
});

export const TutorOrderWhereUniqueInput = inputObjectType({
  name: "TutorOrderWhereUniqueInput",
  definition(t) {
    t.nonNull.string("id");
  },
});

export const GetManyTutorOrdersInput = inputObjectType({
  name: "GetManyTutorOrdersInput",
  definition(t) {
    t.nullable.string("search_input");
    t.nonNull.int("take");
    t.nullable.string("cursor");
  },
});
