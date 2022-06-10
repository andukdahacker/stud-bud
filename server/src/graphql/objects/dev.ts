import { objectType } from "nexus";

export const PageInfo = objectType({
  name: "PageInfo",
  definition(t) {
    t.date("endCursor");
    t.boolean("hasNextPage");
  },
});
