import { mutationField, nonNull } from "nexus";
import { destroyImage, uploadFile } from "../../utils/cloudinary";
import { INTERNAL_SERVER_ERROR } from "../../constants";
import { CreateProfileInput, ProfileWhereUniqueInput } from "../inputs";
import { ProfileMutationOutput } from "../outputs";
import cloudinary from "cloudinary";

export const createProfile = mutationField("createProfile", {
  type: ProfileMutationOutput,
  args: {
    input: nonNull(CreateProfileInput),
  },
  resolve: async (_root, args, ctx) => {
    const { profile_bio, profile_interest, profile_avatar } = args.input;
    const userId = ctx.req.session.userId;

    try {
      let AvtUploadResult: cloudinary.UploadApiResponse | undefined;
      if (profile_avatar) {
        const uploadResult = await uploadFile(profile_avatar);
        AvtUploadResult = uploadResult;
      }
      const avt_secure_url = AvtUploadResult?.secure_url;
      const avt_public_id = AvtUploadResult?.public_id;

      const profile = await ctx.prisma.profile.create({
        data: {
          profile_bio,
          profile_avatar: avt_secure_url ? avt_secure_url : undefined,
          profile_avatar_public_id: avt_public_id ? avt_public_id : undefined,
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
      const { profile_bio, profile_interest, profile_avatar } = args.input;
      const { profile_id } = args.where;

      let AvtUploadResult: cloudinary.UploadApiResponse | undefined;

      if (profile_avatar) {
        const profile = await ctx.prisma.profile.findUnique({
          where: {
            id: profile_id,
          },
        });

        if (!profile)
          return {
            IOutput: {
              code: 400,
              success: false,
              message: "Profile is not found",
            },
          };

        if (profile.profile_avatar_public_id) {
          await destroyImage(profile.profile_avatar_public_id);
        }
        const result = await uploadFile(profile_avatar);

        AvtUploadResult = result;
      }

      const avt_secure_url = AvtUploadResult?.secure_url;
      const avt_public_id = AvtUploadResult?.public_id;

      const updatedProfile = await ctx.prisma.profile.update({
        where: {
          id: profile_id,
        },
        data: {
          profile_bio,
          profile_avatar: avt_secure_url ? avt_secure_url : undefined,
          profile_avatar_public_id: avt_public_id ? avt_public_id : undefined,
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

export const removeAvatar = mutationField("removeAvatar", {
  type: ProfileMutationOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    const { profile_id } = args.where;
    try {
      const updatedProfile = await ctx.prisma.profile.update({
        where: {
          id: profile_id,
        },
        data: {
          profile_avatar: null,
          profile_avatar_public_id: null,
        },
      });

      if (!updateProfile)
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
          message: "Remove avatar successfully",
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
