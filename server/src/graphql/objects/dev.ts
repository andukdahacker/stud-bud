import { objectType } from "nexus";

export const PageInfoDateCursor = objectType({
  name: "PageInfoDataCursor",
  definition(t) {
    t.nullable.date("endCursor");
    t.nonNull.boolean("hasNextPage");
    t.nullable.int("lastTake");
  },
});

export const PageInfoIDCursor = objectType({
  name: "PageInfoIDCursor",
  definition(t) {
    t.nullable.string("endCursor");
    t.nonNull.boolean("hasNextPage");
    t.nullable.int("lastTake");
  },
});
