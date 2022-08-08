import { Field, FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import {
  CreateProfileInput,
  useCreateProfileMutation,
  useGetUserQuery,
} from "../generated/graphql";

const CreateProfile = () => {
  //reroute if profile already existed
  const router = useRouter();
  const { data: GetUserData, loading: GetUserLoading } = useGetUserQuery();
  const user_profile = GetUserData?.getUser?.profile;
  const user_profile_id = user_profile?.id;
  useEffect(() => {
    if (user_profile) router.push(`/profile/${user_profile_id}`);
  }, [user_profile, router, user_profile_id]);
  const [error, setError] = useState<string>();

  const [createProfile, { loading: createProfileLoading }] =
    useCreateProfileMutation();

  const initialValues: CreateProfileInput = {
    profile_bio: "",
    profile_avatar: undefined,
    profile_interest: [{ interest_name: "" }],
  };
  const onSubmit = async ({
    profile_bio,
    profile_avatar,
    profile_interest,
  }: CreateProfileInput) => {
    const result = await createProfile({
      variables: {
        input: {
          profile_bio,
          profile_avatar,
          profile_interest,
        },
      },
    });

    if (!result.data?.createProfile?.IOutput.success) {
      setError(result.data?.createProfile?.IOutput.message);
    } else if (result.data.createProfile.IOutput.success) {
      router.push(`/profile/${result.data?.createProfile?.Profile?.id}`);
    } //fix me
  };

  if (GetUserLoading || createProfileLoading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center p-5">
        <div className="flex flex-col items-center justify-center">
          <h1>Let's set up</h1>
          <div>Fill in the required information</div>
        </div>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="flex items-center justify-center w-2/3 p-4 border border-black">
              <div className="flex flex-col w-full ">
                <label htmlFor="profile_bio">Bio</label>
                <Field
                  name="profile_bio"
                  placeholder="Write about yourself"
                  as="textarea"
                  className="p-2 border border-black "
                />
                <label htmlFor="profile_avatar">Avatar</label>
                <input
                  type="file"
                  onChange={(event) => {
                    if (event.target.files)
                      setFieldValue("profile_avatar", event.target.files[0]);
                  }}
                  className="bg-red-200"
                />
                <label htmlFor="profile_interest">Interests</label>
                <FieldArray name="profile_interest">
                  {({ push, remove }) => (
                    <div>
                      <div className="flex items-center justify-start border border-black">
                        {values.profile_interest.map((interest, index) => {
                          return (
                            <div key={index} className="relative">
                              <Field
                                name={`profile_interest[${index}.interest_name]`}
                                placeholder="interest"
                                className="p-2 bg-gray-200 rounded-full "
                              />
                              <button
                                className="absolute bottom-2 right-3"
                                type="button"
                                onClick={() => remove(index)}
                              >
                                X
                              </button>
                            </div>
                          );
                        })}
                        <button
                          type="button"
                          onClick={() => push({ interest_name: "" })}
                        >
                          Create new interest
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => push({ interest_name: "" })}
                      >
                        +
                      </button>
                    </div>
                  )}
                </FieldArray>
                <button
                  type="submit"
                  disabled={isSubmitting ? true : false}
                  className="w-20 px-2 py-1 font-bold text-white border-2 border-black bg-purple"
                >
                  Submit
                </button>
                {error && <div>{error}</div>}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default CreateProfile;
