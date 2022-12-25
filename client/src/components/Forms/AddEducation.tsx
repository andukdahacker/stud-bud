import { Field, Form, Formik, FormikValues } from "formik";
import { useState } from "react";
import {
  UpsertEducationInput,
  useUpsertEducationMutation,
} from "../../generated/graphql";
import FormLayout from "../Layouts/FormLayout";
import Loading from "../Loading/Loading";
import Avatar from "../Profile/Avatar";

interface AddEducationProps {
  profile_id: string;
  onRequestClose: () => void;
}
const AddEducation = ({ profile_id, onRequestClose }: AddEducationProps) => {
  const [upsertEducation, { loading: UpsertEducationLoading }] =
    useUpsertEducationMutation();

  const [leftAt, setLeftAt] = useState("");
  const [joinedAt, setJoinedAt] = useState("");

  const initialValues: FormikValues & UpsertEducationInput = {
    institution_name: "",
    field_of_study: "",
    education_description: "",
    current: false,
    logo: null,
  };

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
    field_of_study,
    education_description,
    current,
    logo,
  }: FormikValues & UpsertEducationInput) => {
    const result = await upsertEducation({
      variables: {
        where: {
          profile_id,
        },
        input: {
          institution_name,
          field_of_study,
          education_description,
          current,
          logo,
          joined_at: joinedAt == "" ? null : Date.parse(joinedAt),
          left_at: leftAt == "" ? null : Date.parse(leftAt),
        },
      },
    });

    if (result.data?.upsertEducation?.IOutput.success) {
      onRequestClose();
    }
  };
  return (
    <>
      <FormLayout title="Add education">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ setFieldValue }) => (
            <Form>
              <Field name="institution_name" placeholder="institution_name" />
              <Field name="field_of_study" placeholder="field_of_study" />
              <Field name="education_description" placeholder="description" />
              <label>
                Joined at:
                <input
                  type="date"
                  min="1970-01-01"
                  max={new Date().toISOString().substring(0, 10)}
                  value={joinedAt}
                  onChange={(e) => {
                    setJoinedAt(e.target.value);
                  }}
                />
              </label>
              <label>
                Left at:
                <input
                  type="date"
                  min="1970-01-01"
                  max={new Date().toISOString().substring(0, 10)}
                  value={leftAt}
                  onChange={(e) => {
                    setLeftAt(e.target.value);
                  }}
                />
              </label>
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

export default AddEducation;
