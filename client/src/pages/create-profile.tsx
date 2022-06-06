import { Field, FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import {
  CreateProfileInput,
  useCreateProfileMutation,
} from "../generated/graphql";

const CreateProfile = () => {
  //reroute if profile already existed
  const [error, setError] = useState<string>();
  const router = useRouter();

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

  if (createProfileLoading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  return (
    <Layout>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <label htmlFor="profile_bio">Bio</label>
            <Field
              name="profile_bio"
              placeholder="Write about yourself"
              as="textarea"
            />
            <input
              type="file"
              onChange={(event) => {
                if (event.target.files)
                  setFieldValue("profile_avatar", event.target.files[0]);
              }}
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
                        <button onClick={() => remove(index)}>X</button>
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
              Submit
            </button>
            {error && <div>{error}</div>}
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default CreateProfile;
