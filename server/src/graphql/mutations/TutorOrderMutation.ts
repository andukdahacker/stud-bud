import { mutationField, nonNull } from "nexus";
import {
  INTERNAL_SERVER_ERROR,
  SUCCESSFUL_MUTATION,
  UNSUCCESSFUL_MUTATION,
} from "../../constants";
import {
  CreateTutorOrderInput,
  ProfileWhereUniqueInput,
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
    const { tutor_id, tutor_order_interests, tutor_requirements, problem } =
      args.input;
    const { id } = args.where;
    try {
      const tutor_order = await ctx.prisma.tutorOrder.update({
        where: {
          id,
        },
        data: {
          tutor: tutor_id
            ? {
                connect: {
                  id: tutor_id,
                },
              }
            : undefined,
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

export const acceptTutor = mutationField("acceptTutor", {
  type: TutorOrderOutput,
  args: {
    where_1: nonNull(ProfileWhereUniqueInput),
    where_2: nonNull(TutorOrderWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    const { profile_id } = args.where_1;
    const { id: tutor_order_id } = args.where_2;
    try {
      const tutor_order = await ctx.prisma.tutorOrder.update({
        where: {
          id: tutor_order_id,
        },
        data: {
          tutor: {
            connect: {
              id: profile_id,
            },
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
