import { RelationShipInput } from "../types";
import { Context } from "../context";
import { INVALID_INPUT } from "../constants";

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
          message: INVALID_INPUT,
        },
      };

      if (requester_id !== specifier_id) {
        result = {
          IOutput: {
            code: 400,
            success: false,
            message: INVALID_INPUT,
          },
        };
      }
    }
  }

  if (options == "respondBuddy") {
    if (status === "REQUESTED") {
      result = {
        IOutput: {
          code: 400,
          success: false,
          message: INVALID_INPUT,
        },
      };
    }

    if (requester_id === specifier_id && status === "ACCEPTED") {
      result = {
        IOutput: {
          code: 400,
          success: false,
          message: INVALID_INPUT,
        },
      };
    }
  }

  if (requester_id === addressee_id)
    result = {
      IOutput: {
        code: 400,
        success: false,
        message: INVALID_INPUT,
      },
    };

  if (profile?.id !== specifier_id) {
    result = {
      IOutput: {
        code: 400,
        success: false,
        message: INVALID_INPUT,
      },
    };
  }

  return result;
};
