import { objectType } from "nexus";
import { User } from "../objects";
import { IOutput } from "./IOutput";

export const AuthOutput = objectType({
  name: "AuthOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });
    t.nullable.field("User", {
      type: User,
    });
    t.nullable.list.nonNull.field("ErrorFieldOutput", {
      type: ErrorFieldOutput,
    });
  },
});

export const ErrorFieldOutput = objectType({
  name: "ErrorFieldOutput",
  definition(t) {
    t.nonNull.string("field");
    t.nonNull.string("message");
  },
});
