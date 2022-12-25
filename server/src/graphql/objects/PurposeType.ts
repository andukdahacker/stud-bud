import { objectType } from "nexus";
import { Purpose } from "./Purpose";

export const PurposeType = objectType({
  name: "PurposeType",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("purpose_type_name");
    t.nonNull.string("purpose_type_description");
    t.nonNull.string("purpose_id");
    t.nonNull.field("purpose", {
      type: Purpose,
      resolve: async (root, _args, ctx) => {
        const purpose = await ctx.prisma.purpose.findUniqueOrThrow({
          where: {
            id: root.purpose_id,
          },
        });

        return purpose;
      },
    });
    t.nullable.json("extened_purpose_type_data");
  },
});
