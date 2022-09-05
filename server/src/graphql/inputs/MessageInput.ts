import { inputObjectType } from "nexus";

export const SendMessageInput = inputObjectType({
  name: "SendMessageInput",
  definition(t) {
    t.nonNull.string("message_content");
    t.nonNull.string("conversation_id");
  },
});

export const ConversationWhereUniqueInput = inputObjectType({
  name: "ConversationWhereUniqueInput",
  definition(t) {
    t.nonNull.string("conversation_id");
    t.nullable.string("profile_id");
  },
});

export const ConversationGroupWhereUniqueInput = inputObjectType({
  name: "ConversationGroupWhereUniqueInput",
  definition(t) {
    t.nonNull.string("conversation_id");
    t.nonNull.string("profile_id");
  },
});

export const ConversationPageInput = inputObjectType({
  name: "ConversationPageInput",
  definition(t) {
    t.nullable.string("cursor");
    t.nonNull.int("take");
  },
});

export const initConversationInput = inputObjectType({
  name: "initConversationInput",
  definition(t) {
    t.nonNull.string("requester_id");
    t.nonNull.string("addressee_id");
  },
});

export const createGroupConversationInput = inputObjectType({
  name: "createGroupConversationInput",
  definition(t) {
    t.nonNull.string("creator_id");
    t.nonNull.list.nonNull.string("member_ids");
    t.nullable.string("message_content");
  },
});
