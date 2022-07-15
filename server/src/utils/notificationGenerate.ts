import { pubsub } from "../graphql";
import { Context } from "../context";
import { NEW_NOTIFICATION_EVENT } from "../constants";

interface notificationGeneratorInput {
  input: {
    notifier_id: string;
    receiver_id: string[] | string;
    type_id: number;
    entity_id: string;
  };
  ctx: Context;
}

export const notificationGenerator = async ({
  input,
  ctx,
}: notificationGeneratorInput): Promise<boolean> => {
  const { notifier_id, receiver_id, type_id, entity_id } = input;

  if (typeof receiver_id === "string") {
    const notification = await ctx.prisma.notification.create({
      data: {
        notifier: {
          connect: {
            id: notifier_id,
          },
        },
        receiver: {
          connect: {
            id: receiver_id,
          },
        },
        type: {
          connect: {
            id: type_id,
          },
        },
        entity_id,
      },
    });

    pubsub.publish(NEW_NOTIFICATION_EVENT, notification);
    if (!notification) return false;
  } else {
    for (let i = 0; i < receiver_id.length; i++) {
      const notification = await ctx.prisma.notification.create({
        data: {
          notifier: {
            connect: {
              id: notifier_id,
            },
          },
          receiver: {
            connect: {
              id: receiver_id[i],
            },
          },
          type: {
            connect: {
              id: type_id,
            },
          },
          entity_id,
        },
      });

      pubsub.publish(NEW_NOTIFICATION_EVENT, notification);
      if (!notification) return false;
    }
  }

  return true;
};
