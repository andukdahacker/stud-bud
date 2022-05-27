import { RelationShipInput } from "../types";
import { Context } from "../context";

export const validateRelationshipInput = async (
  input: RelationShipInput,
  ctx: Context,
  options: "connectBuddy" | "respondBuddy"
) => {
  const { addressee_id, requester_id, specifier_id, status } = input;
  let result:
    | {
        IOutput: {
          code: number;
          success: boolean;
          message: string;
        };
      }
    | undefined;

  const profile = await ctx.prisma.user
    .findUnique({
      where: {
        id: ctx.req.session.userId,
      },
    })
    .profile();

  if (options == "connectBuddy") {
    if (status === "ACCEPTED" || status === "DECLINED") {
      result = {
        IOutput: {
          code: 400,
          success: false,
          message: "REQUESTED only",
        },
      };
    }

    if (profile?.id !== requester_id) {
      result = {
        IOutput: {
          code: 400,
          success: false,
          message: "Wrong requester",
        },
      };
    }
  }

  if (options == "respondBuddy") {
    if (status === "REQUESTED") {
      result = {
        IOutput: {
          code: 400,
          success: false,
          message: "ACCEPTED or DECLINED only",
        },
      };
    }
  }

  if (requester_id === addressee_id)
    result = {
      IOutput: {
        code: 400,
        success: false,
        message:
          "You can connect with yourself in a spritual level, but on our app it is not yet a viable option",
      },
    };

  if (profile?.id !== specifier_id) {
    result = {
      IOutput: {
        code: 400,
        success: false,
        message: "Wrong specifier",
      },
    };
  }

  return result;
};
