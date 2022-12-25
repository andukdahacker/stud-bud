import { Field, Form, Formik, FormikValues } from "formik";
import { useEffect, useState } from "react";
import {
  EducationFragment,
  UpsertEducationInput,
  useUpsertEducationMutation,
} from "../../generated/graphql";
import FormLayout from "../Layouts/FormLayout";
import Loading from "../Loading/Loading";
import Avatar from "../Profile/Avatar";

interface EditEducationProps {
  education: EducationFragment;
  profile_id: string;
  onRequestClose: () => void;
}

const EditEducation = ({
  education,
  onRequestClose,
  profile_id,
}: EditEducationProps) => {
  const [upserEducation, { loading: UpsertEducationLoading }] =
    useUpsertEducationMutation();
  const initialValues: FormikValues & UpsertEducationInput = {
    institution_name: education.institution_name,
    id: education.id,
    education_description: education.education_description,
    current: education.current,
    field_of_study: education.field_of_study,
    logo: undefined,
    left_at: education.left_at,
    joined_at: education.joined_at,
  };

  const [joinedAt, setJoinedAt] = useState("");
  const [leftAt, setLeftAt] = useState("");

  const [previewLogo, setPreviewLogo] = useState<any>(null);
  const handleChooseLogoImage = (file: File) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        setPreviewLogo(fileReader.result);
      }
    };
    fileReader.readAsDataURL(file);
  };

  const onSubmit = async ({
    institution_name,
    id,
    education_description,
    current,
    field_of_study,

    logo,
  }: FormikValues & UpsertEducationInput) => {
    const result = await upserEducation({
      variables: {
        where: {
          profile_id,
        },
        input: {
          institution_name,
          id,
          education_description,
          current,
          field_of_study,
          left_at: leftAt == "" ? null : Date.parse(leftAt),
          logo,
          joined_at: joinedAt == "" ? null : Date.parse(joinedAt),
        },
      },
    });
    if (result.data?.upsertEducation?.IOutput.success) {
      onRequestClose();
    }
  };
  useEffect(() => {
    if (education.logo) {
      setPreviewLogo(education.logo);
    }
    if (education.joined_at) {
      setJoinedAt(new Date(education.joined_at).toISOString().substring(0, 10));
    }
    if (education.left_at) {
      setLeftAt(new Date(education.left_at).toISOString().substring(0, 10));
    }
  }, []);
  return (
    <>
      <FormLayout title="Edit education">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ setFieldValue }) => (
            <Form>
              <Field name="institution_name" placeholder="Institution name" />
              <Field name="field_of_study" placeholder="Field of study" />
              <Field name="education_description" placeholder="Description" />
              <label>
                Logo
                <input
                  type="file"
                  onChange={(event) => {
                    if (event.target.files) {
                      handleChooseLogoImage(event.target.files[0]);
                      setFieldValue("logo", event.target.files[0]);
                    }
                  }}
                />
                <Avatar img_url={previewLogo} />
              </label>
              <label>
                Joined at:
                <input
                  type="date"
                  value={joinedAt}
                  min="1970-01-01"
                  max={new Date().toISOString().substring(0, 10)}
                  onChange={(e) => {
                    setJoinedAt(e.target.value);
                  }}
                />
              </label>
              <label>
                Joined at:
                <input
                  type="date"
                  value={leftAt}
                  min="1970-01-01"
                  max={new Date().toISOString().substring(0, 10)}
                  onChange={(e) => {
                    setLeftAt(e.target.value);
                  }}
                />
              </label>
              <button type="submit" disabled={UpsertEducationLoading}>
                {UpsertEducationLoading ? <Loading /> : <div>Done</div>}
              </button>
            </Form>
          )}
        </Formik>
      </FormLayout>
    </>
  );
};

export default EditEducation;
