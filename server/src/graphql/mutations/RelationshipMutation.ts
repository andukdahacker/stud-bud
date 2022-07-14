import { mutationField, nonNull } from "nexus";
import { validateRelationshipInput } from "../../utils/validateRelationshipInput";
import {
  ACCEPT_BUDDY_EVENT,
  CONNECT_BUDDY_EVENT,
  INTERNAL_SERVER_ERROR,
  QUERY_SUCCESS,
  SUCCESSFUL_MUTATION,
  UNSUCCESSFUL_MUTATION,
  UNSUCCESSFUL_QUERY,
} from "../../constants";
import {
  ReadBuddyNotificationsInput,
  RelationshipInput,
} from "../inputs/RelationshipInput";
import {
  BuddyNotificationsOutput,
  RelationshipOutput,
} from "../outputs/RelationshipOutput";
import { pubsub } from "../subscriptions";
import { ProfileWhereUniqueInput } from "../inputs";

export const connectBuddy = mutationField("connectBuddy", {
  type: RelationshipOutput,
  args: {
    input: nonNull(RelationshipInput),
  },
  resolve: async (_root, args, ctx) => {
    const { requester_id, addressee_id, status } = args.input;

    const validateInputErrors = await validateRelationshipInput(
      args.input,

      "connectBuddy"
    );

    if (validateInputErrors) return validateInputErrors;

    try {
      const existingRelationship = await ctx.prisma.relationship.findUnique({
        where: {
          requester_id_addressee_id: {
            requester_id,
            addressee_id,
          },
        },
      });

      if (existingRelationship) {
        const updateExistingRelationship = await ctx.prisma.relationship.update(
          {
            where: {
              requester_id_addressee_id: {
                requester_id,
                addressee_id,
              },
            },
            data: {
              status: "REQUESTED",
              isViewed: false,
              isRead: false,
            },
          }
        );

        if (!updateExistingRelationship)
          return {
            IOutput: UNSUCCESSFUL_MUTATION,
          };

        pubsub.publish(CONNECT_BUDDY_EVENT, {
          data: updateExistingRelationship,
        });

        return {
          IOutput: SUCCESSFUL_MUTATION,
        };
      }
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

      pubsub.publish(CONNECT_BUDDY_EVENT, { data: relationship });

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
    const { requester_id, addressee_id, status } = args.input;
    const validateInputErrors = await validateRelationshipInput(
      args.input,

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

        const otherEndRelationship = ctx.prisma.relationship.upsert({
          where: {
            requester_id_addressee_id: {
              requester_id: addressee_id,
              addressee_id: requester_id,
            },
          },
          update: {
            status: "ACCEPTED",
            isViewed: false,
            isRead: false,
          },
          create: {
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
            status: "ACCEPTED",
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

        pubsub.publish(ACCEPT_BUDDY_EVENT, {
          data: result[1],
        });

        return {
          IOutput: {
            code: 200,
            success: true,
            message: "You have become buddies!",
          },
          relationship: result[1],
          otherEndRelationship: result[0],
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
              message: "Request does not exist anymore",
            },
          };

        return {
          IOutput: {
            code: 200,
            success: true,
            message: "Request has been cancelled.",
          },
        };
      }

      return {
        IOutput: {
          code: 200,
          success: true,
          message: "Unhandled",
        },
        relationship: null,
        otherEndRelationship: null,
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
      const delete1 = ctx.prisma.relationship.update({
        where: {
          requester_id_addressee_id: {
            requester_id,
            addressee_id,
          },
        },
        data: {
          status: "DECLINED",
        },
      });

      const delete2 = ctx.prisma.relationship.update({
        where: {
          requester_id_addressee_id: {
            requester_id: addressee_id,
            addressee_id: requester_id,
          },
        },
        data: {
          status: "DECLINED",
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

export const viewBuddyNotifications = mutationField("viewBuddyNotifications", {
  type: BuddyNotificationsOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    const { profile_id } = args.where;
    try {
      const updateBuddyNotifications = await ctx.prisma.relationship.updateMany(
        {
          where: {
            addressee_id: profile_id,
          },
          data: {
            isViewed: true,
          },
        }
      );

      if (!updateBuddyNotifications)
        return {
          IOutput: UNSUCCESSFUL_QUERY,
        };

      return {
        IOutput: QUERY_SUCCESS,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const readBuddyNotifications = mutationField("readBuddyNotifications", {
  type: BuddyNotificationsOutput,
  args: {
    where: nonNull(ReadBuddyNotificationsInput),
  },
  resolve: async (_root, args, ctx) => {
    const { requester_id, addressee_id } = args.where;
    try {
      const updateBuddyNotifications = await ctx.prisma.relationship.update({
        where: {
          requester_id_addressee_id: {
            requester_id,
            addressee_id,
          },
        },
        data: {
          isRead: true,
        },
      });

      if (!updateBuddyNotifications)
        return {
          IOutput: UNSUCCESSFUL_QUERY,
        };

      return {
        IOutput: QUERY_SUCCESS,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});
