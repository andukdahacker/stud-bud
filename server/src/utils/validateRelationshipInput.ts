import { RelationshipInput } from "../types";

import { INVALID_INPUT } from "../constants";

export const validateRelationshipInput = async (
  input: RelationshipInput,

  options: "connectBuddy" | "respondBuddy"
) => {
  const { addressee_id, requester_id, status } = input;
  let result:
    | {
        IOutput: {
          code: number;
          success: boolean;
          message: string;
        };
      }
    | undefined;

  if (options == "connectBuddy") {
    if (status === "ACCEPTED" || status === "DECLINED") {
      result = {
        IOutput: {
          code: 400,
          success: false,
          message: INVALID_INPUT,
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
          message: "1",
        },
      };
    }

    if (requester_id === addressee_id)
      result = {
        IOutput: {
          code: 400,
          success: false,
          message: "3",
        },
      };
  }

  return result;
};
