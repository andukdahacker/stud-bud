import { objectType } from "nexus";
import { TutorOrderTutorConnectStatusCode } from "../enums";
import { Interest } from "./Interest";
import { Profile } from "./Profile";

export const TutorOrder = objectType({
  name: "TutorOrder",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("student_id");
    t.nonNull.field("student", {
      type: Profile,
      resolve: async (root, _args, ctx) => {
        return await ctx.prisma.profile.findUnique({
          where: {
            id: root.student_id,
          },
          rejectOnNotFound: true,
        });
      },
    });
    t.nullable.string("tutor_id");
    t.nullable.field("tutor", {
      type: Profile,
      resolve: async (root, _args, ctx) => {
        if (root.tutor_id) {
          return await ctx.prisma.profile.findUnique({
            where: {
              id: root.tutor_id,
            },
          });
        }
        return null;
      },
    });
    t.nullable.list.nonNull.field("tutor_order_interest", {
      type: TutorOrderInterests,
      resolve: async (root, _args, ctx) => {
        return await ctx.prisma.tutorOrder
          .findUnique({
            where: {
              id: root.id,
            },
          })
          .tutor_order_interests();
      },
    });
    t.nonNull.string("problem");
    t.nonNull.string("tutor_requirements");
    t.nonNull.boolean("isCompleted");
    t.nonNull.date("createdAt");
    t.nonNull.date("updatedAt");
  },
});

export const TutorOrderInterests = objectType({
  name: "TutorOrderInterests",
  definition(t) {
    t.nonNull.string("tutor_order_id");
    t.nonNull.field("tutor_order", {
      type: TutorOrder,
      resolve: async (root, _args, ctx) => {
        return await ctx.prisma.tutorOrder.findUnique({
          where: {
            id: root.tutor_order_id,
          },
          rejectOnNotFound: true,
        });
      },
    });
    t.nonNull.string("interest_id");
    t.nonNull.field("interest", {
      type: Interest,
      resolve: async (root, _args, ctx) => {
        return await ctx.prisma.interest.findUnique({
          where: {
            id: root.interest_id,
          },
          rejectOnNotFound: true,
        });
      },
    });
  },
});

export const TutorOrderTutorConnect = objectType({
  name: "TutorOrderTutorConnect",
  definition(t) {
    t.nonNull.string("tutor_order_id");
    t.nonNull.field("tutor_order", {
      type: TutorOrder,
      resolve: async (root, _args, ctx) => {
        return await ctx.prisma.tutorOrder.findUnique({
          where: {
            id: root.tutor_order_id,
          },
          rejectOnNotFound: true,
        });
      },
    });
    t.nonNull.string("tutor_id");
    t.nonNull.field("tutor", {
      type: Profile,
      resolve: async (root, _args, ctx) => {
        return await ctx.prisma.profile.findUnique({
          where: {
            id: root.tutor_id,
          },
          rejectOnNotFound: true,
        });
      },
    });
    t.nonNull.field("status", {
      type: TutorOrderTutorConnectStatusCode,
    });
  },
});
