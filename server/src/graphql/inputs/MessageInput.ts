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
