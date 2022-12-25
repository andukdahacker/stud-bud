import { FormikValues } from "formik";

import WizardFormStep from "../components/Forms/WizardFormStep";
import WizardFormStepper from "../components/Forms/WizardFormStepper";
import Layout from "../components/Layouts/Layout";
import Loading from "../components/Loading/Loading";

import {
  useCreateProfileMutation,
  useGetUserQuery,
} from "../generated/graphql";
import CreateProfileForm from "../components/Forms/CreateProfileForm";
import OnboardingPurposeForm from "../components/Forms/OnboardingPurposeForm";
import OnboardingSelectPurposeTypeField from "../components/Forms/OnboardingSelectPurposeTypeField";
import { useRouter } from "next/router";

const OnBoarding = () => {
  //reroute if profile already existed
  const router = useRouter();
  const { loading: GetUserLoading } = useGetUserQuery();

  const [createProfile, { loading: createProfileLoading }] =
    useCreateProfileMutation();

  const initialValues = {
    profile_bio: "",
    profile_avatar: "",
    birthday: "",
    location_name: "",
    gender: undefined,
    purpose_name: "",
    purpose_types: [],
  };
  const submitCreateProfileForm = async ({
    profile_bio,
    profile_avatar,
    birthday,
    location_name,
    gender,
  }: FormikValues) => {
    await createProfile({
      variables: {
        input: {
          profile_bio,
          profile_avatar,
          birthday,
          location_name,
          gender,
        },
      },
    });
  };
  const onSubmit = async (values: FormikValues) => {
    router.push({
      pathname: "/spark-buddies/suggested-buddies",
      query: {
        purpose_name: values.purpose_name,
        purpose_types: values.purpose_types,
      },
    });
  };

  if (GetUserLoading || createProfileLoading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  return (
    <Layout>
      <WizardFormStepper initialValues={initialValues} onSubmit={onSubmit}>
        <WizardFormStep
        // onSubmit={submitCreateProfileForm}
        >
          <CreateProfileForm />
        </WizardFormStep>
        <WizardFormStep>
          <OnboardingPurposeForm />
        </WizardFormStep>
        <WizardFormStep>
          <OnboardingSelectPurposeTypeField />
        </WizardFormStep>
      </WizardFormStepper>
    </Layout>
  );
};

export default OnBoarding;
