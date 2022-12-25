import { mutationField, nonNull } from "nexus";
import {
  INTERNAL_SERVER_ERROR,
  SUCCESSFUL_MUTATION,
  UNSUCCESSFUL_MUTATION,
} from "../../constants";
import {
  BuddyRequestWhereUniqueInput,
  CreateBuddyRequestInput,
  UpdateBuddyRequestInput,
} from "../inputs";
import { CreateBuddyRequestOutput } from "../outputs";

export const createBuddyRequest = mutationField("createBuddyRequest", {
  type: CreateBuddyRequestOutput,
  args: {
    input: nonNull(CreateBuddyRequestInput),
  },
  resolve: async (_root, args, ctx) => {
    const {
      profile_id,
      purpose_name,
      purpose_type_name,
      extended_buddy_request_data,
      description,
    } = args.input;
    try {
      const buddy_request = await ctx.prisma.buddyRequest.create({
        data: {
          buddy_requester: {
            connect: {
              id: profile_id,
            },
          },
          purpose: {
            connect: {
              purpose_name,
            },
          },
          purpose_type: {
            connect: {
              purpose_type_name,
            },
          },
          extended_buddy_request_data,
          description,
        },
      });

      if (!buddy_request)
        return {
          IOutput: UNSUCCESSFUL_MUTATION,
        };

      return {
        IOutput: SUCCESSFUL_MUTATION,
        buddy_request,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const updateBuddyRequest = mutationField("updateBuddyRequest", {
  type: CreateBuddyRequestOutput,
  args: {
    where: nonNull(BuddyRequestWhereUniqueInput),
    input: nonNull(UpdateBuddyRequestInput),
  },
  resolve: async (_root, args, ctx) => {
    try {
      const { buddy_request_id } = args.where;
      const {
        purpose_name,
        purpose_type_name,
        description,
        extended_buddy_request_data,
      } = args.input;

      const updatedBuddyRequest = await ctx.prisma.buddyRequest.update({
        where: {
          id: buddy_request_id,
        },
        data: {
          purpose: {
            connect: {
              purpose_name,
            },
          },
          purpose_type: {
            connect: {
              purpose_type_name,
            },
          },
          description,
          extended_buddy_request_data,
        },
      });

      return {
        IOutput: SUCCESSFUL_MUTATION,
        buddy_request: updatedBuddyRequest,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});
