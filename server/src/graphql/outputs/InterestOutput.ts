import { objectType } from "nexus";
import { Interest } from "../objects";
import { IOutput } from "./IOutput";

export const GetManyInterestOutput = objectType({
  name: "GetManyInterestOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });
    t.nullable.list.nullable.field("Interest", {
      type: Interest,
    });
  },
});
