import { TutorOrderTutorConnectStatusCode } from "@prisma/client";
import { mutationField, nonNull } from "nexus";
import { notificationGenerator } from "../../utils/notificationGenerate";
import {
  INTERNAL_SERVER_ERROR,
  NotificationType,
  SUCCESSFUL_MUTATION,
  UNSUCCESSFUL_MUTATION,
} from "../../constants";

import {
  ConnectTutorOrderInput,
  CreateTutorOrderInput,
  MarkCompleteTutorOrderInput,
  ProfileWhereUniqueInput,
  RespondTutorOrderConnectInput,
  TutorOrderWhereUniqueInput,
} from "../inputs";

import { TutorOrderOutput } from "../outputs/TutorOrderOutput";

export const createTutorOrder = mutationField("createTutorOrder", {
  type: TutorOrderOutput,
  args: {
    input: nonNull(CreateTutorOrderInput),
  },
  resolve: async (_root, args, ctx) => {
    const { student_id, tutor_order_interests, tutor_requirements, problem } =
      args.input;
    try {
      const tutor_order = await ctx.prisma.tutorOrder.create({
        data: {
          student: {
            connect: {
              id: student_id,
            },
          },
          tutor_requirements,
          problem,
          tutor_order_interests: {
            create: tutor_order_interests?.map((obj) => ({
              interest: {
                connectOrCreate: {
                  where: {
                    interest_name: obj!.interest_name,
                  },
                  create: {
                    interest_name: obj!.interest_name,
                  },
                },
              },
            })),
          },
        },
      });

      if (!tutor_order)
        return {
          IOutput: UNSUCCESSFUL_MUTATION,
        };

      return {
        IOutput: SUCCESSFUL_MUTATION,
        tutor_order,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const updateTutorOrder = mutationField("updateTutorOrder", {
  type: TutorOrderOutput,
  args: {
    input: nonNull(CreateTutorOrderInput),
    where: nonNull(TutorOrderWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    const { tutor_order_interests, tutor_requirements, problem } = args.input;
    const { id } = args.where;
    try {
      const tutor_order = await ctx.prisma.tutorOrder.update({
        where: {
          id,
        },
        data: {
          tutor_requirements,
          problem,
          tutor_order_interests: {
            deleteMany: {},
            create: tutor_order_interests.map((obj) => ({
              interest: {
                connectOrCreate: {
                  where: {
                    interest_name: obj!.interest_name,
                  },
                  create: {
                    interest_name: obj!.interest_name,
                  },
                },
              },
            })),
          },
        },
      });

      if (!tutor_order)
        return {
          IOutput: UNSUCCESSFUL_MUTATION,
        };

      return {
        IOutput: SUCCESSFUL_MUTATION,
        tutor_order,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const connectTutorOrder = mutationField("connectTutorOrder", {
  type: TutorOrderOutput,
  args: {
    where: nonNull(ConnectTutorOrderInput),
  },
  resolve: async (_root, args, ctx) => {
    const { tutor_order_id, tutor_id, student_id } = args.where;
    try {
      const tutor_order_tutor_connect =
        await ctx.prisma.tutorOrderTutorConnect.create({
          data: {
            tutor: {
              connect: {
                id: tutor_id,
              },
            },
            tutor_order: {
              connect: {
                id: tutor_order_id,
              },
            },
            status: "REQUESTED",
          },
        });

      const notificationResult = await notificationGenerator({
        input: {
          notifier_id: tutor_id,
          receiver_id: student_id,
          type_id: NotificationType.TUTOR_ORDER_REQUEST_TO_BE_TUTOR,
          entity_id: tutor_order_id,
        },
        ctx,
      });

      if (!tutor_order_tutor_connect || !notificationResult)
        return {
          IOutput: UNSUCCESSFUL_MUTATION,
        };
      return {
        IOutput: SUCCESSFUL_MUTATION,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const deleteTutorOrderConnect = mutationField(
  "deleteTutorOrderConnect",
  {
    type: TutorOrderOutput,
    args: {
      where1: nonNull(TutorOrderWhereUniqueInput),
      where2: nonNull(ProfileWhereUniqueInput),
    },
    resolve: async (_root, args, ctx) => {
      const { id: tutor_order_id } = args.where1;
      const { profile_id } = args.where2;
      try {
        const tutor_order_tutor_connect =
          await ctx.prisma.tutorOrderTutorConnect.delete({
            where: {
              tutor_id_tutor_order_id: {
                tutor_id: profile_id,
                tutor_order_id,
              },
            },
          });

        if (!tutor_order_tutor_connect)
          return {
            IOutput: UNSUCCESSFUL_MUTATION,
          };

        return {
          IOutput: SUCCESSFUL_MUTATION,
        };
      } catch (error) {
        return INTERNAL_SERVER_ERROR;
      }
    },
  }
);

export const respondTutorOrderConnect = mutationField(
  "respondTutorOrderConnect",
  {
    type: TutorOrderOutput,
    args: {
      where: nonNull(RespondTutorOrderConnectInput),
    },
    resolve: async (_root, args, ctx) => {
      const { tutor_id, tutor_order_id, status, student_id } = args.where;
      try {
        const tutor_order_tutor_connect =
          await ctx.prisma.tutorOrderTutorConnect.update({
            where: {
              tutor_id_tutor_order_id: {
                tutor_id,
                tutor_order_id,
              },
            },
            data: {
              status,
            },
          });

        const tutor_order = await ctx.prisma.tutorOrder.update({
          where: {
            id: tutor_order_id,
          },
          data: {
            tutor: {
              connect: {
                id: tutor_id,
              },
            },
          },
        });

        if (!tutor_order_tutor_connect || !tutor_order)
          return {
            IOutput: UNSUCCESSFUL_MUTATION,
          };

        if (status === TutorOrderTutorConnectStatusCode.ACCEPTED) {
          await notificationGenerator({
            input: {
              notifier_id: student_id,
              receiver_id: tutor_id,
              type_id: NotificationType.TUTOR_ORDER_ACCEPT_TUTOR_REQUEST,
              entity_id: tutor_order_id,
            },
            ctx,
          });

          const other_tutor_order_tutor_connect =
            await ctx.prisma.tutorOrderTutorConnect.findMany({
              where: {
                tutor_order_id,
                status: "REQUESTED",
              },
            });

          const receiver_id = other_tutor_order_tutor_connect.map((obj) => {
            return obj.tutor_id;
          });

          await ctx.prisma.tutorOrderTutorConnect.updateMany({
            where: {
              tutor_order_id,
              status: "REQUESTED",
            },
            data: {
              status: "DECLINED",
            },
          });

          await notificationGenerator({
            input: {
              notifier_id: student_id,
              receiver_id,
              type_id: NotificationType.TUTOR_ORDER_DECLINE_TUTOR_REQUEST,
              entity_id: tutor_order_id,
            },
            ctx,
          });

          return {
            IOutput: {
              code: 200,
              success: true,
              message: "Your tutor order now has a tutor!",
            },
          };
        } else if (status === TutorOrderTutorConnectStatusCode.DECLINED) {
          await notificationGenerator({
            input: {
              notifier_id: student_id,
              receiver_id: tutor_id,
              type_id: NotificationType.TUTOR_ORDER_DECLINE_TUTOR_REQUEST,
              entity_id: tutor_order_id,
            },
            ctx,
          });
          return {
            IOutput: {
              code: 200,
              success: true,
              message: "Tutor order request declined!",
            },
          };
        } else if (status === "REQUESTED") {
          await notificationGenerator({
            input: {
              notifier_id: tutor_id,
              receiver_id: student_id,
              type_id: NotificationType.TUTOR_ORDER_REQUEST_TO_BE_TUTOR,
              entity_id: tutor_order_id,
            },
            ctx,
          });
          return {
            IOutput: {
              code: 200,
              success: true,
              message: "Reconnect tutor order request",
            },
          };
        }

        return {
          IOutput: SUCCESSFUL_MUTATION,
        };
      } catch (error) {
        return INTERNAL_SERVER_ERROR;
      }
    },
  }
);

export const deleteTutorOrder = mutationField("deleteTutorOrder", {
  type: TutorOrderOutput,
  args: {
    where: nonNull(TutorOrderWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    const { id } = args.where;
    try {
      const tutor_order = await ctx.prisma.tutorOrder.delete({
        where: {
          id,
        },
      });

      if (!tutor_order)
        return {
          IOutput: UNSUCCESSFUL_MUTATION,
        };

      return {
        IOutput: SUCCESSFUL_MUTATION,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const markCompleteTutorOrder = mutationField("markCompleteTutorOrder", {
  type: TutorOrderOutput,
  args: {
    where: nonNull(MarkCompleteTutorOrderInput),
  },
  resolve: async (_root, args, ctx) => {
    const { student_id, tutor_id, tutor_order_id } = args.where;
    try {
      const tutor_order = await ctx.prisma.tutorOrder.update({
        where: {
          id: tutor_order_id,
        },
        data: {
          isCompleted: true,
        },
      });

      const notificationResult = await notificationGenerator({
        input: {
          notifier_id: student_id,
          receiver_id: tutor_id,
          type_id: NotificationType.TUTOR_ORDER_COMPLETE_TUTOR_ORDER,
          entity_id: tutor_order_id,
        },
        ctx,
      });

      if (!tutor_order || !notificationResult)
        return {
          IOutput: UNSUCCESSFUL_MUTATION,
        };

      return {
        IOutput: SUCCESSFUL_MUTATION,
        tutor_order,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});
