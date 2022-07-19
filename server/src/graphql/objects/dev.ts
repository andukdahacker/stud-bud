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

export const CompoundIDEndCursor = objectType({
  name: "CompoundIDEndCursor",
  definition(t) {
    t.nullable.string("id_1");
    t.nullable.string("id_2");
  },
});

export const PageInfoCompoundIDCursor = objectType({
  name: "PageInfoCompoundIDCursor",
  definition(t) {
    t.nullable.field("endCursor", {
      type: CompoundIDEndCursor,
    });
    t.nonNull.boolean("hasNextPage");
    t.nullable.int("lastTake");
  },
});
