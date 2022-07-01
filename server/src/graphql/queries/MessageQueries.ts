import { Message } from "@prisma/client";
import { nonNull, queryField } from "nexus";
import {
  INTERNAL_SERVER_ERROR,
  QUERY_SUCCESS,
  UNSUCCESSFUL_QUERY,
} from "../../constants";
import {
  ConversationPageInput,
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
    page: nonNull(ConversationPageInput),
  },
  resolve: async (_root, args, ctx) => {
    const { conversation_id } = args.where;
    const { cursor, take } = args.page;
    try {
      const conversation = await ctx.prisma.conversation.findUnique({
        where: {
          id: conversation_id,
        },
      });

      if (!conversation)
        return {
          IOutput: UNSUCCESSFUL_QUERY,
        };

      let queryResult: Message[] | null = null;
      if (cursor) {
        queryResult = await ctx.prisma.message.findMany({
          take,
          skip: 1,
          cursor: {
            id: cursor,
          },
          where: {
            conversation_id,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        queryResult = await ctx.prisma.message.findMany({
          take,
          where: {
            conversation_id,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }

      if (queryResult?.length > 0) {
        const lastMessageInResults = queryResult[queryResult.length - 1];

        const myCursor = lastMessageInResults.id;
        const secondQueryResults = await ctx.prisma.message.findMany({
          take,
          skip: 1,
          cursor: {
            id: myCursor,
          },
          where: {
            conversation_id,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        if (secondQueryResults.length > 0)
          return {
            IOutput: QUERY_SUCCESS,
            Conversation: conversation,
            Messages: queryResult,
            ConversationPageInfo: {
              endCursor: myCursor,
              hasNextPage: true,
              lastTake: secondQueryResults.length,
            },
          };
      }

      return {
        IOutput: QUERY_SUCCESS,
        Conversation: conversation,
        Messages: queryResult,
        ConversationPageInfo: {
          endCursor: null,
          hasNextPage: false,
        },
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});
