import { objectType } from "nexus";
import { TutorOrder } from "../objects";
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
