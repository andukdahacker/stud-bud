import { mutationField, nonNull } from "nexus";
import { INTERNAL_SERVER_ERROR } from "../../constants";
import { ProfileWhereUniqueInput } from "../inputs";
import { SendMessageInput } from "../inputs/MessageInput";
import { SendMessageOutput } from "../outputs";

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
