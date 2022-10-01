import { Field, FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import {
  CreateProfileInput,
  GetUserDocument,
  GetUserQuery,
  ProfileWhereUniqueInput,
  useGetProfileLazyQuery,
  useRemoveAvatarMutation,
  useRemoveWallpaperMutation,
  useUpdateProfileMutation,
} from "../../../generated/graphql";
import Avatar from "../../../components/Avatar";
import { useEffect, useRef } from "react";
import Wallpaper from "../../../components/Wallpaper";
import Layout from "../../../components/Layout";
import Loading from "../../../components/Loading";
import { useApolloClient } from "@apollo/client";

const EditProfile = () => {
  const client = useApolloClient();
  const user_profile_id = client.readQuery<GetUserQuery>({
    query: GetUserDocument,
  })?.getUser?.profile?.id;

  const router = useRouter();
  const profile_id = router.query.profileId as string;
  const profileAvatarInput = useRef<null | HTMLInputElement>(null);
  const profileWallpaperInput = useRef<null | HTMLInputElement>(null);

  const [
    getProfile,
    { data: getProfileData, loading: getProfileLoading, refetch },
  ] = useGetProfileLazyQuery();

  useEffect(() => {
    if (router.isReady)
      getProfile({
        variables: {
          where: {
            profile_id,
          },
        },
      });
  }, [router.isReady]);

  const [
    updateProfile,
    { data: updateProfileData, loading: updateProfileLoading },
  ] = useUpdateProfileMutation();

  const updateProfileSuccess =
    updateProfileData?.updateProfile?.IOutput.success;

  const profileData = getProfileData?.getProfile?.Profile;
  const profile_interest = profileData?.profile_interests
    ? profileData.profile_interests.map((obj) => {
        return { interest_name: obj?.interest.interest_name as string };
      })
    : [{ interest_name: "" }];
  const profile_bio = profileData?.profile_bio ? profileData.profile_bio : "";
  const profile_avatar = profileData?.profile_avatar
    ? profileData.profile_avatar
    : undefined;
  const profile_avatar_public_id = profileData?.profile_avatar_public_id;
  const profile_wallpaper = profileData?.profile_wallpaper
    ? profileData.profile_wallpaper
    : undefined;
  const profile_wallpaper_public_id = profileData?.profile_wallpaper_public_id;

  const initialValues: CreateProfileInput & ProfileWhereUniqueInput = {
    profile_bio,
    profile_avatar: undefined,
    profile_wallpaper: undefined,
    profile_interest,
    profile_id,
  };

  const onSubmit = async ({
    profile_id,
    profile_bio,
    profile_avatar,
    profile_wallpaper,
    profile_interest,
  }: CreateProfileInput & ProfileWhereUniqueInput) => {
    const result = await updateProfile({
      variables: {
        where: { profile_id },
        input: {
          profile_bio,
          profile_avatar,
          profile_wallpaper,
          profile_interest,
        },
      },
    });

    if (result.data?.updateProfile?.IOutput.success) {
      refetch({
        where: {
          profile_id,
        },
      });
      router.push(`/profile/${profile_id}`);
    }
  };

  const [
    removeAvatar,
    { data: removeAvatarData, loading: removeAvatarLoading },
  ] = useRemoveAvatarMutation();
  const onRemoveAvatar = async (public_id: string) => {
    const result = await removeAvatar({
      variables: {
        where: {
          profile_id,
        },
        input: {
          img_public_id: public_id,
        },
      },
    });

    if (result.data?.removeAvatar?.IOutput.success) {
      refetch({
        where: {
          profile_id,
        },
      });
    }
  };

  const removeAvatarSuccess = removeAvatarData?.removeAvatar?.IOutput.success;

  const [
    removeWallpaper,
    { data: removeWallpaperData, loading: removeWallpaperLoading },
  ] = useRemoveWallpaperMutation();
  const onRemoveWallpaper = async (public_id: string) => {
    const result = await removeWallpaper({
      variables: {
        where: {
          profile_id,
        },
        input: {
          img_public_id: public_id,
        },
      },
    });

    if (result.data?.removeWallpaper?.IOutput.success) {
      refetch({
        where: {
          profile_id,
        },
      });
    }
  };

  const removeWallpaperSuccess =
    removeWallpaperData?.removeWallpaper?.IOutput.success;
  if (
    getProfileLoading ||
    updateProfileLoading ||
    removeAvatarLoading ||
    removeWallpaperLoading
  )
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  if (user_profile_id !== profile_id) {
    return (
      <Layout>
        <div>Forbidden</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <div className="">
              <div>
                <Wallpaper img_url={profile_wallpaper} />
                <input
                  type="file"
                  onChange={(event) => {
                    if (event.target.files)
                      setFieldValue("profile_wallpaper", event.target.files[0]);
                  }}
                  className="hidden"
                  ref={profileWallpaperInput}
                />
                <button type="button">Edit wallpaper</button>
                <div>
                  <button
                    type="button"
                    className={`hidden`}
                    onClick={() => profileWallpaperInput.current!.click()}
                  >
                    Add wallpaper
                  </button>
                  {profile_wallpaper_public_id && (
                    <button
                      className=""
                      onClick={() =>
                        onRemoveWallpaper(profile_wallpaper_public_id)
                      }
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={() => profileAvatarInput.current!.click()}
              >
                <Avatar
                  img_url={profile_avatar}
                  width={4}
                  height={4}
                  border={3}
                />
              </button>
              {profile_avatar_public_id && (
                <button
                  type="button"
                  onClick={() => onRemoveAvatar(profile_avatar_public_id)}
                >
                  Delete
                </button>
              )}

              <input
                type="file"
                onChange={(event) => {
                  if (event.target.files)
                    setFieldValue("profile_avatar", event.target.files[0]);
                }}
                className="hidden"
                ref={profileAvatarInput}
              />
            </div>
            <label htmlFor="profile_bio">Bio</label>
            <Field
              name="profile_bio"
              placeholder="Write about yourself"
              as="textarea"
            />
            <label htmlFor="profile_interest">Interests</label>
            <FieldArray name="profile_interest">
              {({ push, remove }) => (
                <div>
                  {values.profile_interest.map((_interest, index) => {
                    return (
                      <div key={index}>
                        <Field
                          name={`profile_interest[${index}.interest_name]`}
                          placeholder="interest"
                        />
                        <button type="button" onClick={() => remove(index)}>
                          X
                        </button>
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => push({ interest_name: "" })}
                  >
                    +
                  </button>
                </div>
              )}
            </FieldArray>
            <button type="submit" disabled={isSubmitting ? true : false}>
              Save
            </button>

            {updateProfileSuccess ? null : (
              <div>{updateProfileData?.updateProfile?.IOutput.message}</div>
            )}
            {removeAvatarSuccess ? null : (
              <div>{removeAvatarData?.removeAvatar?.IOutput.message}</div>
            )}
            {removeWallpaperSuccess ? null : (
              <div>{removeWallpaperData?.removeWallpaper?.IOutput.message}</div>
            )}
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default EditProfile;
