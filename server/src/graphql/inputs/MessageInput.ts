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
