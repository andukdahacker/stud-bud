import { Field, Form, Formik, FormikValues } from "formik";
import { useEffect, useState } from "react";
import {
  UpsertWorkExperienceInput,
  useUpsertWorkExperienceMutation,
  WorkExperienceFragment,
} from "../../generated/graphql";
import FormLayout from "../Layouts/FormLayout";
import Loading from "../Loading/Loading";
import Avatar from "../Profile/Avatar";

interface EditWorkExperienceProps {
  work_experience: WorkExperienceFragment;
  profile_id: string;
  onRequestClose: () => void;
}

const EditWorkExperience = ({
  work_experience,
  onRequestClose,
  profile_id,
}: EditWorkExperienceProps) => {
  const [upsertWorkExperience, { loading: UpsertWorkExperienceLoading }] =
    useUpsertWorkExperienceMutation();
  const [previewLogo, setPreviewLogo] = useState<any>(null);
  const [joinedAt, setJoinedAt] = useState<string>("");
  const [leftAt, setLeftAt] = useState<string>("");

  const initialValues: FormikValues & UpsertWorkExperienceInput = {
    id: work_experience.id,
    workplace_name: work_experience.workplace_name,
    work_position: work_experience.work_position ?? "",
    work_description: work_experience.work_description ?? "",
    logo: undefined,
    current: work_experience.current,
  };

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
    id,
    workplace_name,
    work_position,
    work_description,
    current,

    logo,
  }: FormikValues & UpsertWorkExperienceInput) => {
    const result = await upsertWorkExperience({
      variables: {
        where: {
          profile_id,
        },
        input: {
          id,
          workplace_name,
          work_description,
          work_position,
          logo,
          current,
          left_at: leftAt == "" ? null : Date.parse(leftAt),
          joined_at: joinedAt == "" ? null : Date.parse(joinedAt),
        },
      },
    });

    if (result.data?.upsertWorkExperience?.IOutput.success) {
      onRequestClose();
    }
  };

  useEffect(() => {
    if (work_experience.logo) {
      setPreviewLogo(work_experience.logo);
    }
    if (work_experience.joined_at) {
      setJoinedAt(
        new Date(work_experience.joined_at).toISOString().substring(0, 10)
      );
    }

    if (work_experience.left_at) {
      setLeftAt(
        new Date(work_experience.left_at).toISOString().substring(0, 10)
      );
    }
  }, []);
  return (
    <>
      <FormLayout title="Edit work experience">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ setFieldValue }) => (
            <Form>
              <Field name="workplace_name" placeholder="Workplace name" />
              <Field name="work_position" placeholder="Work position" />
              <Field name="work_description" placeholde="Description" />
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
              <label>
                Joined at
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
                Left at
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
              <button type="submit" disabled={UpsertWorkExperienceLoading}>
                {UpsertWorkExperienceLoading ? <Loading /> : <div>Done</div>}
              </button>
            </Form>
          )}
        </Formik>
      </FormLayout>
    </>
  );
};

export default EditWorkExperience;
