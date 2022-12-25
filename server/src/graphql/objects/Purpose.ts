import { objectType } from "nexus";

import { PurposeType } from "./PurposeType";

export const Purpose = objectType({
  name: "Purpose",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("purpose_name");
    t.nonNull.string("purpose_description");

    t.nullable.list.nullable.field("purpose_type", {
      type: PurposeType,
      resolve: async (root, _args, ctx) => {
        const purpose_type = await ctx.prisma.purposeType.findMany({
          where: {
            purpose_id: root.id,
          },
        });
        return purpose_type;
      },
    });
  },
});
