import { objectType } from "nexus";
import {
  PageInfoIDCursor,
  TutorOrder,
  TutorOrderTutorConnect,
} from "../objects";

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

export const GetTutorOrderTutorConnectOutput = objectType({
  name: "GetTutorOrderTutorConnectOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });

    t.nullable.field("tutor_order_tutor_connect", {
      type: TutorOrderTutorConnect,
    });
  },
});

export const GetManyTutorOrderTutorConnectOutput = objectType({
  name: "GetManyTutorOrderTutorConnect",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });

    t.nullable.list.nullable.field("tutor_order_tutor_connect", {
      type: TutorOrderTutorConnect,
    });
  },
});
