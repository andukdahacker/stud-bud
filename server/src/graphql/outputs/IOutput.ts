import { objectType } from "nexus";

export const IOutput = objectType({
  name: "IOutput",
  definition(t) {
    t.nonNull.int("code");
    t.nonNull.boolean("success");
    t.nonNull.string("message");
  },
});

// type IOutput = {
//   code: number;
//   success: boolean;
//   message: string;
// };
