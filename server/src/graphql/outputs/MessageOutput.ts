import { objectType } from "nexus";
import { Conversation, ConversationGroup, Message } from "../objects";
import { IOutput } from "./IOutput";

export const SendMessageOutput = objectType({
  name: "SendMessageOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });
    t.nullable.field("Message", {
      type: Message,
    });
  },
});

export const getManyConversationsOutput = objectType({
  name: "getManyConversationPutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });
    t.nullable.list.nonNull.field("Conversations", {
      type: ConversationGroup,
    });
    t.nullable.int("countNotViewedConversation");
  },
});

export const ConversationPageInfo = objectType({
  name: "ConversationPageInfo",
  definition(t) {
    t.nullable.string("endCursor");
    t.nonNull.boolean("hasNextPage");
    t.nullable.int("lastTake");
  },
});

export const getConversationOutput = objectType({
  name: "getConversationOutput",
  definition(t) {
    t.nonNull.field("IOutput", {
      type: IOutput,
    });

    t.nullable.field("Conversation", {
      type: Conversation,
    });

    t.nullable.list.nonNull.field("Messages", {
      type: Message,
    });

    t.nullable.field("ConversationPageInfo", {
      type: ConversationPageInfo,
    });
  },
});
