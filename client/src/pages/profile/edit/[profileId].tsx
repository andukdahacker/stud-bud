import { Field, FieldArray, Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import NavBar from "../../../components/NavBar";
import {
  CreateProfileInput,
  GetProfileDocument,
  GetProfileOutput,
  GetProfileQuery,
  ProfileWhereUniqueInput,
  useGetProfileQuery,
  useRemoveAvatarMutation,
  useRemoveWallpaperMutation,
  useUpdateProfileMutation,
} from "../../../generated/graphql";
import { useCheckAuth } from "../../../utils/useCheckAuth";
import Avatar from "../../../components/Avatar";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Wallpaper from "../../../components/Wallpaper";

const EditProfile = () => {
  const { data: checkAuthData, loading: checkAuthLoading } = useCheckAuth();
  const router = useRouter();
  const profile_id = router.query.profileId as string;
  const profileAvatarInput = useRef<null | HTMLInputElement>(null);
  const profileWallpaperInput = useRef<null | HTMLInputElement>(null);

  const { data: getProfileData, loading: getProfileLoading } =
    useGetProfileQuery({
      variables: {
        where: {
          profile_id,
        },
      },
    });

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
      update(cache, { data }) {
        if (data?.updateProfile?.IOutput.success) {
          cache.writeQuery<GetProfileQuery>({
            query: GetProfileDocument,
            data: {
              __typename: "Query",
              getProfile: data.updateProfile,
            },
          });
        }
      },
    });

    if (result.data?.updateProfile?.IOutput.success) {
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
      router.reload();
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
      router.reload();
    }
  };

  const removeWallpaperSuccess =
    removeWallpaperData?.removeWallpaper?.IOutput.success;
  if (
    getProfileLoading ||
    updateProfileLoading ||
    checkAuthLoading ||
    removeAvatarLoading ||
    removeWallpaperLoading
  )
    return (
      <>
        <NavBar />
        <div>Loading...</div>
      </>
    );

  if (checkAuthData?.getUser?.profile?.id !== profile_id) {
    return (
      <>
        <NavBar />
        <div>Forbidden</div>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>StudBud</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <div className=" bg-red-50">
              <button
                type="button"
                className="w-full h-full "
                onClick={() => profileWallpaperInput.current!.click()}
              >
                <Wallpaper img_url={profile_wallpaper} />
              </button>
              {profile_wallpaper_public_id && (
                <button
                  className=""
                  onClick={() => onRemoveWallpaper(profile_wallpaper_public_id)}
                >
                  Delete
                </button>
              )}
              <input
                type="file"
                onChange={(event) => {
                  if (event.target.files)
                    setFieldValue("profile_wallpaper", event.target.files[0]);
                }}
                className="hidden"
                ref={profileWallpaperInput}
              />
            </div>
            <div>
              <button
                type="button"
                onClick={() => profileAvatarInput.current!.click()}
              >
                <Avatar img_url={profile_avatar} />
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
                  {values.profile_interest.map((interest, index) => {
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
            {removeAvatarSuccess ? null : (
              <div>{removeAvatarData?.removeAvatar?.IOutput.message}</div>
            )}
            {removeWallpaperSuccess ? null : (
              <div>{removeWallpaperData?.removeWallpaper?.IOutput.message}</div>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditProfile;
