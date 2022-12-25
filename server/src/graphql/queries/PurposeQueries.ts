import { nonNull, queryField } from "nexus";
import {
  INTERNAL_SERVER_ERROR,
  QUERY_SUCCESS,
  UNSUCCESSFUL_QUERY,
} from "../../constants";
import {
  getManyPurposesInput,
  GetManyPurposeTypesInput,
  GetUniquePurposeTypeInput,
} from "../inputs";
import {
  getManyPurposesOutput,
  GetManyPurposeTypesOutput,
  GetUniquePurposeType,
} from "../outputs";

export const getManyPurposes = queryField("getManyPurposes", {
  type: getManyPurposesOutput,
  args: {
    where: nonNull(getManyPurposesInput),
  },
  resolve: async (_root, args, ctx) => {
    try {
      const { purpose_name } = args.where;
      const purposes = await ctx.prisma.purpose.findMany({
        where: {
          purpose_name: {
            contains: purpose_name,
            mode: "insensitive",
          },
        },
      });

      return {
        IOutput: QUERY_SUCCESS,
        purposes,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const getManyPurposeTypes = queryField("getManyPurposeTypes", {
  type: GetManyPurposeTypesOutput,
  args: {
    where: nonNull(GetManyPurposeTypesInput),
  },
  resolve: async (_root, args, ctx) => {
    try {
      const { purpose_type, partial } = args.where;
      const purpose_types = await ctx.prisma.purposeType.findMany({
        where: {
          purpose_type_name: partial
            ? {
                contains: purpose_type,
                mode: "insensitive",
              }
            : purpose_type,
        },
      });
      return {
        IOutput: QUERY_SUCCESS,
        purpose_types,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const getUniquePurposeType = queryField("getUniquePurposeType", {
  type: GetUniquePurposeType,
  args: {
    where: nonNull(GetUniquePurposeTypeInput),
  },
  resolve: async (_root, args, ctx) => {
    try {
      const { purpose_type_name } = args.where;
      const purpose_type = await ctx.prisma.purposeType.findUnique({
        where: {
          purpose_type_name,
        },
      });

      return {
        IOutput: QUERY_SUCCESS,
        purpose_type,
      };
    } catch (error) {
      return {
        IOutput: UNSUCCESSFUL_QUERY,
      };
    }
  },
});
