import { inputObjectType } from "nexus";
import { TutorOrderTutorConnectStatusCode } from "../enums";
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

export const ConnectTutorOrderInput = inputObjectType({
  name: "ConnectTutorOrderInput",
  definition(t) {
    t.nonNull.string("tutor_order_id");
    t.nonNull.string("student_id");
    t.nonNull.string("tutor_id");
    t.nullable.string("message_content");
  },
});

export const RespondTutorOrderConnectInput = inputObjectType({
  name: "ResondTutorOrderConnectInput",
  definition(t) {
    t.nonNull.field("status", {
      type: TutorOrderTutorConnectStatusCode,
    });

    t.nonNull.string("tutor_id");
  },
});
