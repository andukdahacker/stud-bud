import { Field, Form, Formik, FormikValues } from "formik";
import { useUpdateIntroductionMutation } from "../../generated/graphql";
import FormLayout from "../Layouts/FormLayout";
import Loading from "../Loading/Loading";

interface EditIntroductionProps {
  profile_bio: string | null | undefined;
  profile_id: string;
  onRequestClose: () => void;
}

const EditIntroduction = ({
  profile_bio,
  profile_id,
  onRequestClose,
}: EditIntroductionProps) => {
  const [updateIntroduction, { loading: UpdateIntroductionLoading }] =
    useUpdateIntroductionMutation();

  const initialValues: FormikValues = {
    profile_bio: profile_bio,
  };

  const onSubmit = async (values: FormikValues) => {
    const result = await updateIntroduction({
      variables: {
        where: {
          profile_id,
        },
        input: {
          profile_bio: values.profile_bio,
        },
      },
    });
    if (result.data?.updateIntroduction?.IOutput.success) {
      onRequestClose();
    }
  };
  return (
    <>
      <FormLayout title="Edit profile bio">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <Field name="profile_bio" as="textarea" placeholder="Bio" />

            <button type="submit" disabled={UpdateIntroductionLoading}>
              {UpdateIntroductionLoading ? <Loading /> : <div>Done</div>}
            </button>
          </Form>
        </Formik>
      </FormLayout>
    </>
  );
};

export default EditIntroduction;
