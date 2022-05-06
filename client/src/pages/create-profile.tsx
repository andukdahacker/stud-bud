import { Field, FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import NavBar from "../components/NavBar";
import {
  CreateProfileInput,
  useCreateProfileMutation,
} from "../generated/graphql";

const CreateProfile = () => {
  const [error, setError] = useState<string>();
  const router = useRouter();

  const [createProfile, { loading: createProfileLoading }] =
    useCreateProfileMutation();

  const initialValues: CreateProfileInput = {
    profile_bio: "",
    profile_interest: [{ interest_name: "" }],
  };
  const onSubmit = async ({
    profile_bio,
    profile_interest,
  }: CreateProfileInput) => {
    const result = await createProfile({
      variables: {
        input: {
          profile_bio,
          profile_interest,
        },
      },
    });

    if (!result.data?.createProfile?.IOutput.success) {
      setError(result.data?.createProfile?.IOutput.message);
    } else if (result.data.createProfile.IOutput.success) {
      router.push(`/dashboard/${result.data?.createProfile?.Profile?.id}`);
    } //fix me
  };

  if (createProfileLoading)
    return (
      <>
        <NavBar />
        <div>Loading...</div>
      </>
    );
  return (
    <div>
      <NavBar />
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, values }) => (
          <Form>
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
    </div>
  );
};

export default CreateProfile;
