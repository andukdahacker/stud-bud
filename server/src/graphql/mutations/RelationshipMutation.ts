import { mutationField, nonNull } from "nexus";
import { validateRelationshipInput } from "../../utils/validateRelationshipInput";
import { INTERNAL_SERVER_ERROR } from "../../constants";
import { RelationshipInput } from "../inputs/RelationshipInput";
import { RelationshipOutput } from "../outputs/RelationshipOutput";

export const connectBuddy = mutationField("connectBuddy", {
  type: RelationshipOutput,
  args: {
    input: nonNull(RelationshipInput),
  },
  resolve: async (_root, args, ctx) => {
    const { requester_id, addressee_id, specifier_id, status } = args.input;

    const validateInputErrors = await validateRelationshipInput(
      args.input,
      ctx,
      "connectBuddy"
    );

    if (validateInputErrors) return validateInputErrors;

    try {
      const relationship = await ctx.prisma.relationship.create({
        data: {
          requester: {
            connect: {
              id: requester_id,
            },
          },
          addressee: {
            connect: {
              id: addressee_id,
            },
          },
          specifier: {
            connect: {
              id: specifier_id,
            },
          },
          status,
        },
      });

      if (!relationship)
        return {
          IOutput: {
            code: 400,
            success: false,
            message: "Request failed",
          },
        };
      return {
        IOutput: {
          code: 200,
          success: true,
          message: "Request made successfully",
        },
        Relationship: relationship,
      };
    } catch (error) {
      return {
        IOutput: {
          code: 500,
          success: false,
          message: INTERNAL_SERVER_ERROR,
        },
      };
    }
  },
});

export const respondBuddy = mutationField("respondBuddy", {
  type: RelationshipOutput,
  args: {
    input: nonNull(RelationshipInput),
  },
  resolve: async (_root, args, ctx) => {
    const { requester_id, addressee_id, specifier_id, status } = args.input;
    const validateInputErrors = await validateRelationshipInput(
      args.input,
      ctx,
      "respondBuddy"
    );

    if (validateInputErrors) return validateInputErrors;
    try {
      if (status === "ACCEPTED") {
        const updatedRelationship = await ctx.prisma.relationship.update({
          where: {
            requester_id_addressee_id: {
              requester_id,
              addressee_id,
            },
          },
          data: {
            status,
          },
        });

        await ctx.prisma.relationship.create({
          data: {
            requester: {
              connect: {
                id: addressee_id,
              },
            },
            addressee: {
              connect: {
                id: requester_id,
              },
            },
            specifier: {
              connect: {
                id: specifier_id,
              },
            },
            status,
          },
        });

        return {
          IOutput: {
            code: 200,
            success: true,
            message: "ACCEPTED",
          },
          Relationship: updatedRelationship,
        };
      } else if (status === "DECLINED") {
        const relationship = await ctx.prisma.relationship.delete({
          where: {
            requester_id_addressee_id: {
              requester_id,
              addressee_id,
            },
          },
        });

        if (!relationship)
          return {
            IOutput: {
              code: 400,
              success: false,
              message: "Relationship does not exist",
            },
          };

        return {
          IOutput: {
            code: 200,
            success: true,
            message: "DECLINED",
          },
        };
      }

      return {
        IOutput: {
          code: 200,
          success: true,
          message: "Unhandled",
        },
      };
    } catch (error) {
      return {
        IOutput: {
          code: 500,
          success: false,
          message: INTERNAL_SERVER_ERROR,
        },
      };
    }
  },
});

export const removeBuddy = mutationField("removeBuddy", {
  type: RelationshipOutput,
  args: {
    input: nonNull(RelationshipInput),
  },
  resolve: async (_root, args, ctx) => {
    const { requester_id, addressee_id } = args.input;
    try {
      const delete1 = ctx.prisma.relationship.delete({
        where: {
          requester_id_addressee_id: {
            requester_id,
            addressee_id,
          },
        },
      });

      const delete2 = ctx.prisma.relationship.delete({
        where: {
          requester_id_addressee_id: {
            requester_id: addressee_id,
            addressee_id: requester_id,
          },
        },
      });

      const deleteResult = await ctx.prisma.$transaction([delete1, delete2]);
      if (!deleteResult)
        return {
          IOutput: {
            code: 400,
            success: false,
            message: "Request failed",
          },
        };

      return {
        IOutput: {
          code: 200,
          success: true,
          message: "Success unBuddy",
        },
      };
    } catch (error) {
      return {
        IOutput: {
          code: 500,
          success: false,
          message: INTERNAL_SERVER_ERROR,
        },
      };
    }
  },
});
