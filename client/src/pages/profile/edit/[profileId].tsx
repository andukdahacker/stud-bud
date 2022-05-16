import { Field, FieldArray, Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import NavBar from "../../../components/NavBar";
import {
  CreateProfileInput,
  ProfileWhereUniqueInput,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../generated/graphql";
import { useCheckAuth } from "../../../utils/useCheckAuth";
import Avatar from "../../../components/Avatar";
import { useRef } from "react";

const EditProfile = () => {
  const { data: checkAuthData, loading: checkAuthLoading } = useCheckAuth();
  const router = useRouter();
  const profile_id = router.query.profileId as string;
  const fileInput = useRef<null | HTMLInputElement>(null);

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

  const getProfileSuccess = getProfileData?.getProfile?.IOutput.success;
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

  const initialValues: CreateProfileInput & ProfileWhereUniqueInput = {
    profile_bio,
    profile_avatar: undefined,
    profile_interest,
    profile_id,
  };

  const onSubmit = async ({
    profile_id,
    profile_bio,
    profile_avatar,
    profile_interest,
  }: CreateProfileInput & ProfileWhereUniqueInput) => {
    const result = await updateProfile({
      variables: {
        where: { profile_id },
        input: {
          profile_bio,
          profile_avatar,
          profile_interest,
        },
      },
    });

    if (result.data?.updateProfile?.IOutput.success) {
      router.push(`/profile/${profile_id}`);
    }
  };

  if (getProfileLoading || updateProfileLoading || checkAuthLoading)
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
            <button type="button" onClick={() => fileInput.current!.click()}>
              <Avatar img_url={profile_avatar} />
            </button>
            <input
              type="file"
              onChange={(event) => {
                if (event.target.files)
                  setFieldValue("profile_avatar", event.target.files[0]);
              }}
              className="hidden"
              ref={fileInput}
            />
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
            {getProfileSuccess ? null : (
              <div>{getProfileData?.getProfile?.IOutput.message}</div>
            )}

            {updateProfileSuccess ? null : (
              <div>{updateProfileData?.updateProfile?.IOutput.message}</div>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditProfile;
