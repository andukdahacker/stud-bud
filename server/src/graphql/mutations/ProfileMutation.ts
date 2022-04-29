import { mutationField, nonNull } from "nexus";
import { INTERNAL_SERVER_ERROR } from "../../constants";
import { CreateProfileInput, ProfileWhereUniqueInput } from "../inputs";
import { ProfileMutationOutput } from "../outputs";

export const createProfile = mutationField("createProfile", {
  type: ProfileMutationOutput,
  args: {
    input: nonNull(CreateProfileInput),
  },
  resolve: async (_root, args, ctx) => {
    const { profile_bio, profile_interest } = args.input;
    const userId = ctx.req.session.userId;

    try {
      const profile = await ctx.prisma.profile.create({
        data: {
          profile_bio,
          profile_interests:
            profile_interest.length === 0
              ? undefined
              : {
                  create: profile_interest.map((obj) => ({
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
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return {
        IOutput: {
          code: 200,
          success: true,
          message: "Profile created successfully",
        },
        Profile: profile,
      };
    } catch (error) {
      return {
        IOutput: {
          code: 500,
          success: false,
          message: INTERNAL_SERVER_ERROR,
        },
      };
    }
  },
});

export const updateProfile = mutationField("updateProfile", {
  type: ProfileMutationOutput,
  args: {
    input: nonNull(CreateProfileInput),
    where: nonNull(ProfileWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    try {
      const { profile_bio, profile_interest } = args.input;
      const { profile_id } = args.where;

      const updatedProfile = await ctx.prisma.profile.update({
        where: {
          id: profile_id,
        },
        data: {
          profile_bio,
          profile_interests: {
            deleteMany: {},
            create: profile_interest.map((obj) => ({
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

      if (!updatedProfile)
        return {
          IOutput: {
            code: 400,
            success: false,
            message: "Profile is not found",
          },
        };

      return {
        IOutput: {
          code: 200,
          success: true,
          message: "Profile updated successfully",
        },
        Profile: updatedProfile,
      };
    } catch (error) {
      return {
        IOutput: {
          code: 500,
          success: false,
          message: INTERNAL_SERVER_ERROR,
        },
      };
    }
  },
});
