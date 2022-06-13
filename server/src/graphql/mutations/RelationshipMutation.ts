import { mutationField, nonNull } from "nexus";
import { validateRelationshipInput } from "../../utils/validateRelationshipInput";
import {
  ACCEPT_BUDDY_EVENT,
  CONNECT_BUDDY_EVENT,
  INTERNAL_SERVER_ERROR,
  RELATIONSHIP_ACCEPT,
  RELATIONSHIP_CONNECT,
} from "../../constants";
import { RelationshipInput } from "../inputs/RelationshipInput";
import { RelationshipOutput } from "../outputs/RelationshipOutput";
import { pubsub } from "../subscriptions";

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
          Relationship: relationship,
        };

      const notification = await ctx.prisma.notification.create({
        data: {
          notifier: {
            connect: {
              id: requester_id,
            },
          },
          receiver: {
            connect: {
              id: addressee_id,
            },
          },
          isRead: false,
          type: {
            connect: {
              id: RELATIONSHIP_CONNECT,
            },
          },
        },
      });

      pubsub.publish(CONNECT_BUDDY_EVENT, { data: notification });

      return {
        IOutput: {
          code: 200,
          success: true,
          message: "Request made successfully",
        },
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
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
        const updatedRelationship = ctx.prisma.relationship.update({
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

        const otherEndRelationship = ctx.prisma.relationship.create({
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

        const result = await ctx.prisma.$transaction([
          updatedRelationship,
          otherEndRelationship,
        ]);

        if (!result)
          return {
            IOutput: {
              code: 400,
              success: false,
              message: "Request failed",
            },
          };

        const notification = await ctx.prisma.notification.create({
          data: {
            notifier: {
              connect: {
                id: addressee_id,
              },
            },
            receiver: {
              connect: {
                id: requester_id,
              },
            },
            isRead: false,
            type: {
              connect: {
                id: RELATIONSHIP_ACCEPT,
              },
            },
          },
        });

        pubsub.publish(ACCEPT_BUDDY_EVENT, {
          data: notification,
        });

        return {
          IOutput: {
            code: 200,
            success: true,
            message: "ACCEPTED",
          },
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
      return INTERNAL_SERVER_ERROR;
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
      return INTERNAL_SERVER_ERROR;
    }
  },
});
