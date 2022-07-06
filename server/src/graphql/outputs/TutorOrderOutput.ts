import { objectType } from "nexus";
import { PageInfoIDCursor, TutorOrder } from "../objects";
import { IOutput } from "./IOutput";

export const TutorOrderOutput = objectType({
  name: "TutorOrderOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });
    t.nullable.field("tutor_order", {
      type: TutorOrder,
    });
  },
});

export const GetManyTutorOrdersOutput = objectType({
  name: "GetManyTutorOrdersOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });
    t.nullable.list.nonNull.field("tutor_order", {
      type: TutorOrder,
    });
    t.nullable.field("PageInfoIDCursor", {
      type: PageInfoIDCursor,
    });
  },
});
