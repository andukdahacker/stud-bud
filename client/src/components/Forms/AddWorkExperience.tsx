import { Field, Form, Formik, FormikValues } from "formik";
import { useState } from "react";
import {
  UpsertWorkExperienceInput,
  useUpsertWorkExperienceMutation,
} from "../../generated/graphql";
import FormLayout from "../Layouts/FormLayout";
import Loading from "../Loading/Loading";
import Avatar from "../Profile/Avatar";

interface AddWorkExperienceProps {
  profile_id: string;
}
const AddWorkExperience = ({ profile_id }: AddWorkExperienceProps) => {
  const [upsertWorkExperience, { loading: UpsertWorkExperience }] =
    useUpsertWorkExperienceMutation();
  const initialValues: FormikValues & UpsertWorkExperienceInput = {
    workplace_name: "",
    work_position: "",
    work_description: null,
    logo: null,
    current: false,
  };

  const [joinedAt, setJoinedAt] = useState<string>(
    new Date().toISOString().substring(0, 10)
  );
  const [leftAt, setLeftAt] = useState<string>(
    new Date().toISOString().substring(0, 10)
  );

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
    workplace_name,
    work_position,
    work_description,
    logo,
    current,
  }: FormikValues) => {
    await upsertWorkExperience({
      variables: {
        where: {
          profile_id,
        },
        input: {
          workplace_name,
          work_position,
          work_description,
          logo,
          current,
          joined_at: Date.parse(joinedAt),
          left_at: Date.parse(leftAt),
        },
      },
    });
  };
  return (
    <>
      <FormLayout title="Add more work experience">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ setFieldValue }) => (
            <div>
              <Form>
                <Field name="workplace_name" placeholder="Workplace name" />
                <Field name="work_position" placeholder="Work position" />
                <label>
                  Joined at:
                  <input
                    type="date"
                    value={joinedAt}
                    min={"1970-01-01"}
                    max={new Date().toISOString().substring(0, 10)}
                    onChange={(e) => {
                      setJoinedAt(e.target.value);
                    }}
                  />
                </label>
                <label>
                  Left at:
                  <input
                    type="date"
                    value={leftAt}
                    min={"1970-01-01"}
                    max={new Date().toISOString().substring(0, 10)}
                    onChange={(e) => {
                      setLeftAt(e.target.value);
                    }}
                  />
                </label>
                <label>
                  Current job?
                  <Field name="current" type="checkbox" />
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
                <button type="submit" disabled={UpsertWorkExperience}>
                  {UpsertWorkExperience ? <Loading /> : <div>Done</div>}
                </button>
              </Form>
            </div>
          )}
        </Formik>
      </FormLayout>
    </>
  );
};

export default AddWorkExperience;
