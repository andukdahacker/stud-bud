import { nonNull, subscriptionField } from "nexus";
import {
  INTERNAL_SERVER_ERROR,
  NEW_MESSAGE_EVENT,
  NEW_MESSAGE_EVENT2,
  QUERY_SUCCESS,
  UNSUCCESSFUL_QUERY,
} from "../../constants";
import { pubsub } from ".";
import {
  ConversationGroupWhereUniqueInput,
  ProfileWhereUniqueInput,
} from "../inputs";
import { getConversationOutput, getManyConversationsOutput } from "../outputs";
import { ConversationGroup, Message } from "@prisma/client";
import { withFilter } from "graphql-subscriptions";

export const getConversationSub = subscriptionField("getConversation", {
  type: getConversationOutput,
  args: {
    where: nonNull(ConversationGroupWhereUniqueInput),
  },
  subscribe: withFilter(
    () => pubsub.asyncIterator([NEW_MESSAGE_EVENT]),
    (root: Message, args, _ctx) => {
      return (
        root.conversation_id === args.where.conversation_id &&
        root.message_author_id !== args.where.profile_id
      );
    }
  ),
  resolve: async (root: Message, _args, ctx) => {
    try {
      const message = await ctx.prisma.message.findUnique({
        where: {
          id: root.id,
        },
      });

      const conversation = await ctx.prisma.conversation.findUnique({
        where: {
          id: root.conversation_id,
        },
      });

      if (!message)
        return {
          IOutput: UNSUCCESSFUL_QUERY,
        };
      return {
        IOutput: QUERY_SUCCESS,
        Conversation: conversation,
        Messages: [message],
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const getManyConversationsSub = subscriptionField(
  "getManyConversations",
  {
    type: getManyConversationsOutput,
    args: {
      where: nonNull(ProfileWhereUniqueInput),
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator([NEW_MESSAGE_EVENT2]),
      (root: ConversationGroup[], args, _ctx) => {
        const conversation = root.find(
          (conversation) =>
            conversation.conversation_member_id === args.where.profile_id
        );
        if (!conversation) return false;
        return true;
      }
    ),

    resolve: async (_root: ConversationGroup, args, ctx) => {
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
  }
);
