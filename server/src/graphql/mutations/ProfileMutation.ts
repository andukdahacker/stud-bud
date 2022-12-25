import { mutationField, nonNull } from "nexus";
import { destroyImage, uploadImage } from "../../utils/cloudinary";
import {
  INTERNAL_SERVER_ERROR,
  SUCCESSFUL_MUTATION,
  UNSUCCESSFUL_MUTATION,
} from "../../constants";
import {
  ChangeImageInput,
  CreateProfileInput,
  DestroyImageInput,
  EducationWhereUniqueInput,
  ProfileWhereUniqueInput,
  updateIntroductionInput,
  UpsertAgeLocationInput,
  UpsertEducationInput,
  UpsertWorkExperienceInput,
  WorkExperienceWhereUniqueInput,
} from "../inputs";
import {
  ProfileMutationOutput,
  UpsertEducationOutput,
  UpsertWorkExperienceOutput,
} from "../outputs";
import cloudinary from "cloudinary";

export const createProfile = mutationField("createProfile", {
  type: ProfileMutationOutput,
  args: {
    input: nonNull(CreateProfileInput),
  },
  resolve: async (_root, args, ctx) => {
    const { profile_bio, profile_avatar, gender, location_name, birthday } =
      args.input;
    const userId = ctx.req.session.userId;

    try {
      let AvtUploadResult: cloudinary.UploadApiResponse | undefined;
      if (profile_avatar) {
        const uploadResult = await uploadImage(profile_avatar);
        AvtUploadResult = uploadResult;
      }
      const avt_secure_url = AvtUploadResult?.secure_url;
      const avt_public_id = AvtUploadResult?.public_id;

      const profile = await ctx.prisma.profile.create({
        data: {
          profile_bio,
          profile_avatar: avt_secure_url,
          profile_avatar_public_id: avt_public_id,
          birthday,
          location: location_name
            ? {
                connectOrCreate: {
                  create: {
                    location_name: location_name,
                  },
                  where: {
                    location_name: location_name,
                  },
                },
              }
            : undefined,
          gender,
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
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const upsertAgeLocation = mutationField("upsertAgeLocation", {
  type: ProfileMutationOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
    input: nonNull(UpsertAgeLocationInput),
  },
  resolve: async (_root, args, ctx) => {
    try {
      const { profile_id } = args.where;
      const { birthday, location_name } = args.input;

      const profile = await ctx.prisma.profile.update({
        where: {
          id: profile_id,
        },
        data: {
          birthday,
          location: {
            connectOrCreate: {
              create: {
                location_name,
              },
              where: {
                location_name,
              },
            },
          },
        },
      });

      if (!profile)
        return {
          IOutput: UNSUCCESSFUL_MUTATION,
        };

      return {
        IOutput: SUCCESSFUL_MUTATION,
        Profile: profile,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const updateIntroduction = mutationField("updateIntroduction", {
  type: ProfileMutationOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
    input: nonNull(updateIntroductionInput),
  },
  resolve: async (_root, args, ctx) => {
    try {
      const { profile_id } = args.where;
      const { profile_bio } = args.input;

      const updatedProfile = await ctx.prisma.profile.update({
        where: {
          id: profile_id,
        },
        data: {
          profile_bio,
        },
      });

      if (!updatedProfile)
        return {
          IOutput: UNSUCCESSFUL_MUTATION,
        };

      return {
        IOutput: SUCCESSFUL_MUTATION,
        Profile: updatedProfile,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const upsertWorkExperience = mutationField("upsertWorkExperience", {
  type: UpsertWorkExperienceOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
    input: nonNull(UpsertWorkExperienceInput),
  },
  resolve: async (_root, args, ctx) => {
    try {
      const {
        id,
        workplace_name,
        work_description,
        work_position,
        current,
        joined_at,
        left_at,
        logo,
      } = args.input;

      const profile_id = args.where.profile_id;

      if (id) {
        const work_experience = await ctx.prisma.workExperience.findUnique({
          where: {
            id,
          },
        });

        if (logo) {
          if (work_experience?.logo_public_id) {
            await destroyImage(work_experience.logo_public_id);
          }
        }
      }

      let logoUploadResult: cloudinary.UploadApiResponse | undefined;

      if (logo) {
        logoUploadResult = await uploadImage(logo);
      }

      if (current) {
        const updateAllWorkExperience =
          await ctx.prisma.workExperience.updateMany({
            where: {
              profile_id,
            },
            data: {
              current: false,
            },
          });
        if (!updateAllWorkExperience)
          return {
            IOutput: UNSUCCESSFUL_MUTATION,
          };
      }

      const updatedWorkExperience = await ctx.prisma.workExperience.upsert({
        where: {
          id: id ?? "thisIdCannotBeMatched",
        },
        create: {
          workplace_name,
          work_description,
          work_position,
          current,
          joined_at,
          left_at,
          logo: logoUploadResult?.secure_url,
          logo_public_id: logoUploadResult?.public_id,
          profile: {
            connect: {
              id: profile_id ?? "thisIdCannotBeMatched",
            },
          },
        },
        update: {
          workplace_name,
          work_description,
          work_position,
          current,
          joined_at,
          left_at,
          logo: logoUploadResult?.secure_url,
          logo_public_id: logoUploadResult?.public_id,
        },
      });
      if (!updatedWorkExperience)
        return {
          IOutput: UNSUCCESSFUL_MUTATION,
        };

      return {
        IOutput: SUCCESSFUL_MUTATION,
        work_experience: updatedWorkExperience,
      };
    } catch (error) {
      console.log(error);
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const deleteWorkExperience = mutationField("deleteWorkExperience", {
  type: ProfileMutationOutput,
  args: {
    where: nonNull(WorkExperienceWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    try {
      const { id } = args.where;

      const work_experience = await ctx.prisma.workExperience.delete({
        where: {
          id,
        },
      });

      if (work_experience.logo_public_id) {
        destroyImage(work_experience.logo_public_id);
      }

      if (!work_experience)
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

export const upsertEducation = mutationField("upsertEducation", {
  type: UpsertEducationOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
    input: nonNull(UpsertEducationInput),
  },
  resolve: async (_root, args, ctx) => {
    try {
      const {
        id,
        field_of_study,
        institution_name,
        education_description,
        current,
        joined_at,
        left_at,
        logo,
      } = args.input;
      const profile_id = args.where.profile_id;
      let logoUploadResult: cloudinary.UploadApiResponse | undefined;

      if (id) {
        const education = await ctx.prisma.education.findUnique({
          where: {
            id,
          },
        });
        if (logo) {
          if (education?.logo_public_id) {
            await destroyImage(education.logo_public_id);
          }
        }
      }

      if (logo) {
        logoUploadResult = await uploadImage(logo);
      }

      if (current) {
        const updateAllEducation = await ctx.prisma.education.updateMany({
          where: {
            profile_id,
          },
          data: {
            current: false,
          },
        });

        if (!updateAllEducation)
          return {
            IOutput: UNSUCCESSFUL_MUTATION,
          };
      }

      const updatedEducation = await ctx.prisma.education.upsert({
        where: {
          id: id ?? "thisIdCannotBeMatched",
        },
        create: {
          institution_name,
          education_description,
          field_of_study,

          joined_at,
          left_at,
          logo: logoUploadResult?.secure_url,
          logo_public_id: logoUploadResult?.public_id,
          profile: {
            connect: {
              id: profile_id ?? "thisIdCannotBeMatched",
            },
          },
        },
        update: {
          institution_name,
          education_description,
          field_of_study,
          current,
          joined_at,
          left_at,
          logo: logoUploadResult?.secure_url,
          logo_public_id: logoUploadResult?.public_id,
        },
      });

      if (!updatedEducation)
        return {
          IOutput: UNSUCCESSFUL_MUTATION,
        };

      return {
        IOutput: SUCCESSFUL_MUTATION,
        education: updatedEducation,
      };
    } catch (error) {
      console.log(error);
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const deleteEducation = mutationField("deleteEducation", {
  type: ProfileMutationOutput,
  args: {
    where: nonNull(EducationWhereUniqueInput),
  },
  resolve: async (_root, args, ctx) => {
    try {
      const { id } = args.where;

      const education = await ctx.prisma.education.delete({
        where: {
          id,
        },
      });

      if (education.logo_public_id) {
        await destroyImage(education.logo_public_id);
      }

      if (!education)
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

export const updateWallpaper = mutationField("updateWallpaper", {
  type: ProfileMutationOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
    input: nonNull(ChangeImageInput),
  },
  resolve: async (_root, args, ctx) => {
    try {
      const { profile_id } = args.where;
      const { image_file } = args.input;

      const profile = await ctx.prisma.profile.findUnique({
        where: {
          id: profile_id,
        },
      });

      if (profile?.profile_wallpaper_public_id) {
        await destroyImage(profile.profile_wallpaper_public_id);
      }

      const WppUploadResult = await uploadImage(image_file);

      const updatedProfile = await ctx.prisma.profile.update({
        where: {
          id: profile_id,
        },
        data: {
          profile_wallpaper: WppUploadResult?.secure_url,
          profile_wallpaper_public_id: WppUploadResult?.public_id,
        },
      });

      if (!updatedProfile)
        return {
          IOutput: UNSUCCESSFUL_MUTATION,
        };

      return {
        IOutput: SUCCESSFUL_MUTATION,
        Profile: updatedProfile,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const updateAvatar = mutationField("updateAvatar", {
  type: ProfileMutationOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
    input: nonNull(ChangeImageInput),
  },
  resolve: async (_root, args, ctx) => {
    try {
      const { profile_id } = args.where;
      const { image_file } = args.input;

      const profile = await ctx.prisma.profile.findUnique({
        where: {
          id: profile_id,
        },
      });

      if (profile?.profile_avatar_public_id) {
        await destroyImage(profile.profile_avatar_public_id);
      }

      const WppUploadResult = await uploadImage(image_file);

      const updatedProfile = await ctx.prisma.profile.update({
        where: {
          id: profile_id,
        },
        data: {
          profile_avatar: WppUploadResult?.secure_url,
          profile_avatar_public_id: WppUploadResult?.public_id,
        },
      });

      if (!updatedProfile)
        return {
          IOutput: UNSUCCESSFUL_MUTATION,
        };

      return {
        IOutput: SUCCESSFUL_MUTATION,
        Profile: updatedProfile,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const removeAvatar = mutationField("removeAvatar", {
  type: ProfileMutationOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
    input: nonNull(DestroyImageInput),
  },
  resolve: async (_root, args, ctx) => {
    const { profile_id } = args.where;
    const { img_public_id } = args.input;
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

      if (!updatedProfile)
        return {
          IOutput: {
            code: 400,
            success: false,
            message: "Profile is not found",
          },
        };

      await destroyImage(img_public_id);

      return {
        IOutput: {
          code: 200,
          success: true,
          message: "Remove avatar successfully",
        },
        Profile: updatedProfile,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});

export const removeWallpaper = mutationField("removeWallpaper", {
  type: ProfileMutationOutput,
  args: {
    where: nonNull(ProfileWhereUniqueInput),
    input: nonNull(DestroyImageInput),
  },
  resolve: async (_root, args, ctx) => {
    const { profile_id } = args.where;
    const { img_public_id } = args.input;
    try {
      const updatedProfile = await ctx.prisma.profile.update({
        where: {
          id: profile_id,
        },
        data: {
          profile_wallpaper: null,
          profile_wallpaper_public_id: null,
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

      await destroyImage(img_public_id);

      return {
        IOutput: {
          code: 200,
          success: true,
          message: "Remove wallpaper successfully",
        },
        Profile: updatedProfile,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  },
});
