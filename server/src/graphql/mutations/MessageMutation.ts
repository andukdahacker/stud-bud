import { mutationField, nonNull } from "nexus";
import {
  INTERNAL_SERVER_ERROR,
  NEW_MESSAGE_EVENT,
  UNSUCCESSFUL_QUERY,
  UNSUCCESSFUL_MUTATION,
  SUCCESSFUL_MUTATION,
  NEW_MESSAGE_EVENT2,
} from "../../constants";
import { ProfileWhereUniqueInput } from "../inputs";
import {
  ConversationGroupWhereUniqueInput,
  SendMessageInput,
} from "../inputs/MessageInput";
import { IOutput, SendMessageOutput } from "../outputs";
import { pubsub } from "../subscriptions";

export const sendMessage = mutationField("sendMessage", {
  type: SendMessageOutput,
  args: {
    input: nonNull(SendMessageInput),
    where: nonNull(ProfileWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    const { profile_id } = args.where;
    const { message_content, conversation_id } = args.input;
    try {
      if (message_content === "")
        return {
          IOutput: UNSUCCESSFUL_QUERY,
        };
      const message = await ctx.prisma.message.create({
        data: {
          message_author: {
            connect: {
              id: profile_id,
            },
          },
          conversation: {
            connect: {
              id: conversation_id,
            },
          },
          message_content,
        },
      });

      if (!message)
        return {
          IOutput: {
            code: 400,
            success: false,
            message: "Unable to send message",
          },
        };

      await ctx.prisma.conversationGroup.updateMany({
        where: {
          conversation_id,
          NOT: {
            conversation_member_id: profile_id,
          },
        },
        data: {
          isRead: false,
          isViewed: false,
        },
      });

      const conversations = await ctx.prisma.conversationGroup.findMany({
        where: {
          conversation_id,
        },
      });

      pubsub.publish(NEW_MESSAGE_EVENT, message);
      pubsub.publish(NEW_MESSAGE_EVENT2, conversations);
      return {
        IOutput: {
          code: 200,
          success: true,
          message: "Message sent",
        },
        Message: message,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const viewMessage = mutationField("viewMessage", {
  type: IOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    const { profile_id } = args.where;
    try {
      const updated = await ctx.prisma.conversationGroup.updateMany({
        where: {
          conversation_member_id: profile_id,
        },
        data: {
          isViewed: true,
        },
      });

      if (!updated) return UNSUCCESSFUL_MUTATION;

      return SUCCESSFUL_MUTATION;
    } catch (error) {
      return INTERNAL_SERVER_ERROR.IOutput;
    }
  },
});

export const readMessage = mutationField("readMessage", {
  type: IOutput,
  args: {
    where: nonNull(ConversationGroupWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    const { conversation_id, profile_id } = args.where;
    try {
      const updated = await ctx.prisma.conversationGroup.update({
        where: {
          conversation_member_id_conversation_id: {
            conversation_id,
            conversation_member_id: profile_id,
          },
        },
        data: {
          isRead: true,
        },
      });

      if (!updated) return UNSUCCESSFUL_MUTATION;

      return SUCCESSFUL_MUTATION;
    } catch (error) {
      return INTERNAL_SERVER_ERROR.IOutput;
    }
  },
});