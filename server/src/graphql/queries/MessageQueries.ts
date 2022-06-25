import { nonNull, queryField } from "nexus";
import {
  INTERNAL_SERVER_ERROR,
  QUERY_SUCCESS,
  UNSUCCESSFUL_QUERY,
} from "../../constants";
import {
  ConversationWhereUniqueInput,
  ProfileWhereUniqueInput,
} from "../inputs";
import { getConversationOutput, getManyConversationsOutput } from "../outputs";

export const getManyConversations = queryField("getManyConversations", {
  type: getManyConversationsOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    const { profile_id } = args.where;
    try {
      const conversations = await ctx.prisma.conversationGroup.findMany({
        where: {
          conversation_member_id: profile_id,
        },
      });

      const countNotViewedConversation =
        await ctx.prisma.conversationGroup.count({
          where: {
            conversation_member_id: profile_id,
            isViewed: false,
          },
        });

      return {
        IOutput: QUERY_SUCCESS,
        Conversations: conversations,
        countNotViewedConversation,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const getConversation = queryField("getConversation", {
  type: getConversationOutput,
  args: {
    where: nonNull(ConversationWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    const { conversation_id } = args.where;
    try {
      const conversation = await ctx.prisma.conversation.findUnique({
        where: {
          id: conversation_id,
        },
      });

      const messages = await ctx.prisma.message.findMany({
        where: {
          conversation_id,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      // const reverseMessageArray = messages.reverse();

      if (!conversation)
        return {
          IOutput: UNSUCCESSFUL_QUERY,
        };

      return {
        IOutput: QUERY_SUCCESS,
        Conversation: conversation,
        Messages: messages,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});
