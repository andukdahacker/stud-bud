import { objectType } from "nexus";

import { Profile } from "./Profile";

export const Message = objectType({
  name: "Message",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("message_author_id");
    t.nonNull.field("author", {
      type: Profile,
      resolve: async (root, _args, ctx) => {
        const author = await ctx.prisma.profile.findUnique({
          where: {
            id: root.message_author_id,
          },
          rejectOnNotFound: true,
        });

        return author;
      },
    });
    t.nonNull.string("conversation_id");
    t.nonNull.string("message_content");
    t.nullable.date("createdAt");
  },
});

export const Conversation = objectType({
  name: "Conversation",
  definition(t) {
    t.nonNull.string("id");
    t.nullable.string("conversation_name");
    t.nullable.string("conversation_avatar");
    t.nonNull.list.nonNull.field("conversation_member", {
      type: Profile,
      resolve: async (root, _args, ctx) => {
        const members = await ctx.prisma.profile.findMany({
          where: {
            conversation_member: {
              some: {
                conversation_id: root.id,
              },
            },
          },
        });

        return members;
      },
    });
    t.nullable.field("conversation_latest_message", {
      type: Message,
      resolve: async (root, _args, ctx) => {
        const message = await ctx.prisma.message.findFirst({
          where: {
            conversation_id: root.id,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return message;
      },
    });
  },
});

export const ConversationGroup = objectType({
  name: "ConversationGroup",
  definition(t) {
    t.nonNull.string("conversation_member_id");
    t.nonNull.string("conversation_id");
    t.nonNull.field("conversation", {
      type: Conversation,
      resolve: async (root, _args, ctx) => {
        const conversation = await ctx.prisma.conversation.findUnique({
          where: {
            id: root.conversation_id,
          },
          rejectOnNotFound: true,
        });

        return conversation;
      },
    });
    t.nonNull.boolean("isRead");
    t.nonNull.boolean("isViewed");
    t.nonNull.date("joined_at");
    t.nullable.date("left_at");
  },
});
