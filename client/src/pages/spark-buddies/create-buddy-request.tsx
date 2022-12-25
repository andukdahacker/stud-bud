import { FormikValues } from "formik";

import CreateBuddyRequestPurposeForm from "../../components/Forms/CreateBuddyRequestPurposeForm";
import CreateBuddyRequestPurposeTypeForm from "../../components/Forms/CreateBuddyRequestPurposeTypeForm";
import PreviewBuddyRequest from "../../components/Forms/PreviewBuddyRequest";

import WizardFormStep from "../../components/Forms/WizardFormStep";
import WizardFormStepper from "../../components/Forms/WizardFormStepper";
import Layout from "../../components/Layouts/Layout";
import SparkBuddiesLayout from "../../components/Layouts/SparkBuddiesLayout";
import Loading from "../../components/Loading/Loading";
import { useCreateBuddyRequestMutation } from "../../generated/graphql";
import { useCheckAuth } from "../../utils/useCheckAuth";

const CreateBuddyRequest = () => {
  const { data: userData, loading: GetUserLoading } = useCheckAuth();
  const profile_id = userData?.getUser?.profile?.id as string;
  const [
    createBuddyRequest,
    { data: CreateBuddyRequestData, loading: CreateBuddyRequestLoading },
  ] = useCreateBuddyRequestMutation();

  const CreateBuddyRequestSuccess =
    CreateBuddyRequestData?.createBuddyRequest?.IOutput.success;

  const initialValues = {
    purpose_name: "",
    profile_id: "",
    purpose_type_name: "",
    description: "",
    extended_buddy_request_data: {},
  };

  const onSubmit = async (values: FormikValues) => {
    await createBuddyRequest({
      variables: {
        input: {
          profile_id: profile_id,
          purpose_name: values.purpose_name,
          purpose_type_name: values.purpose_type_name,
          description: values.description,
          extended_buddy_request_data: values.extended_buddy_request_data,
        },
      },
    });
  };

  if (GetUserLoading || CreateBuddyRequestLoading)
    return (
      <>
        <Layout>
          <Loading />
        </Layout>
      </>
    );
  return (
    <>
      <Layout>
        <SparkBuddiesLayout>
          <WizardFormStepper initialValues={initialValues} onSubmit={onSubmit}>
            <WizardFormStep>
              <CreateBuddyRequestPurposeForm />
            </WizardFormStep>
            <WizardFormStep>
              <CreateBuddyRequestPurposeTypeForm />
            </WizardFormStep>
            <WizardFormStep>
              <PreviewBuddyRequest />
            </WizardFormStep>
          </WizardFormStepper>
        </SparkBuddiesLayout>
      </Layout>
    </>
  );
};

export default CreateBuddyRequest;
