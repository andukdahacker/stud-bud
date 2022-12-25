import { Field, Form, Formik, FormikValues } from "formik";
import { useEffect, useState } from "react";

import {
  ProfileFragment,
  useUpsertAgeLocationMutation,
} from "../../generated/graphql";
import FormLayout from "../Layouts/FormLayout";
import Loading from "../Loading/Loading";

interface EditAgeLocationProps {
  profile: ProfileFragment;
  onRequestClose: () => void;
}

const EditAgeLocation = ({ profile, onRequestClose }: EditAgeLocationProps) => {
  const [upsertAgeLocation, { loading: UpsertAgeLocationLoading }] =
    useUpsertAgeLocationMutation();
  const [birthdayInput, setBirthDayInput] = useState("");
  const profile_id = profile.id;
  const birthday = profile.birthday;
  const birthdate = new Date(birthday).toISOString().substring(0, 10);
  const location_name = profile.location?.location_name;
  const initialValues: FormikValues = {
    location_name: location_name ?? "",
  };

  const onSubmit = async ({ location_name }: FormikValues) => {
    const result = await upsertAgeLocation({
      variables: {
        where: {
          profile_id,
        },
        input: {
          birthday: Date.parse(birthdayInput),
          location_name,
        },
      },
    });

    if (result.data?.upsertAgeLocation?.IOutput.success) {
      onRequestClose();
    }
  };

  useEffect(() => {
    if (birthday) {
      setBirthDayInput(birthdate);
    }
  }, [birthday]);

  return (
    <>
      <FormLayout title="Edit age and location">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <input
              type="date"
              min="1960-01-01"
              max={new Date().toISOString().substring(0, 10)}
              value={birthdayInput}
              onChange={(e) => {
                setBirthDayInput(e.target.value);
              }}
            />
            <Field name="location_name" placeholder={"location_name"} />
            <button type="submit" disabled={UpsertAgeLocationLoading}>
              {UpsertAgeLocationLoading ? <Loading /> : <div>Done</div>}
            </button>
          </Form>
        </Formik>
      </FormLayout>
    </>
  );
};

export default EditAgeLocation;
