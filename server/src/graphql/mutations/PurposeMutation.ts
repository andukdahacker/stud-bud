import { mutationField, nonNull } from "nexus";
import {
  INTERNAL_SERVER_ERROR,
  SUCCESSFUL_MUTATION,
  UNSUCCESSFUL_MUTATION,
} from "../../constants";
import { CreatePurposeTypeInput } from "../inputs";
import { CreatePurposeTypeOutput } from "../outputs";

export const createPurposeType = mutationField("createPurposeType", {
  type: CreatePurposeTypeOutput,
  args: {
    input: nonNull(CreatePurposeTypeInput),
  },

  resolve: async (_root, args, ctx) => {
    try {
      const { purpose_name, purpose_type_description, purpose_type_name } =
        args.input;

      const purpose_type = await ctx.prisma.purposeType.create({
        data: {
          purpose_type_name,
          purpose_type_description,
          purpose: {
            connect: {
              purpose_name,
            },
          },
        },
      });

      if (!purpose_type) {
        return {
          IOutput: UNSUCCESSFUL_MUTATION,
        };
      }

      return {
        IOutput: SUCCESSFUL_MUTATION,
        purpose_type,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});
