import { TutorOrderTutorConnectStatusCode } from "@prisma/client";
import { mutationField, nonNull } from "nexus";
import {
  INTERNAL_SERVER_ERROR,
  NotificationType,
  SUCCESSFUL_MUTATION,
  UNSUCCESSFUL_MUTATION,
} from "../../constants";

import {
  ConnectTutorOrderInput,
  CreateTutorOrderInput,
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
        ctx.prisma.tutorOrderTutorConnect.create({
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
      const notification = ctx.prisma.notification.create({
        data: {
          entity_id: tutor_order_id,
          notifier: {
            connect: {
              id: tutor_id,
            },
          },
          receiver: {
            connect: {
              id: student_id,
            },
          },
          type: {
            connect: {
              id: NotificationType.TUTOR_ORDER_REQUEST_TO_BE_TUTOR,
            },
          },
        },
      });

      const result = await ctx.prisma.$transaction([
        tutor_order_tutor_connect,
        notification,
      ]);

      if (!result)
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

export const respondTutorOrderConnect = mutationField(
  "respondTutorOrderConnect",
  {
    type: TutorOrderOutput,
    args: {
      where: nonNull(TutorOrderWhereUniqueInput),
      input: nonNull(RespondTutorOrderConnectInput),
    },
    resolve: async (_root, args, ctx) => {
      const { id: tutor_order_id } = args.where;
      const { status, tutor_id } = args.input;
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

        if (!tutor_order_tutor_connect)
          return {
            IOutput: UNSUCCESSFUL_MUTATION,
          };

        if (status === TutorOrderTutorConnectStatusCode.ACCEPTED) {
          return {
            IOutput: {
              code: 200,
              success: true,
              message: "Your tutor order now has a tutor!",
            },
          };
        } else if (status === TutorOrderTutorConnectStatusCode.DECLINED) {
          return {
            IOutput: {
              code: 200,
              success: true,
              message: "Tutor order request declined!",
            },
          };
        }

        return {
          IOutput: SUCCESSFUL_MUTATION,
        };
      } catch (error) {
        console.log(error);
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
