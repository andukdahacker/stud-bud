import { ErrorMessage, Field, useFormikContext } from "formik";
import { useState } from "react";
import { Gender } from "../../generated/graphql";
import FormLayout from "../Layouts/FormLayout";
import Avatar from "../Profile/Avatar";
import TextError from "./TextError";

const CreateProfileForm = () => {
  const { setFieldValue } = useFormikContext();
  const [birthdayInput, setBirthDayInput] = useState(
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
  return (
    <FormLayout title="Create your profile">
      <div className="flex flex-col items-center justify-start w-full h-full p-5">
        <label className="flex flex-col items-center justify-center">
          Avatar
          <Avatar img_url={previewLogo} />
          <input
            type="file"
            onChange={(event) => {
              if (event.target.files) {
                handleChooseLogoImage(event.target.files[0]);
                setFieldValue("logo", event.target.files[0]);
              }
            }}
          />
        </label>
        <label htmlFor="profile_bio" className="mt-5">
          Bio
        </label>
        <Field
          name="profile_bio"
          placeholder="Write about yourself"
          as="textarea"
          className="p-2 border border-black"
        />
        <ErrorMessage component={TextError} name="profile_bio" />

        <label className="mt-5">Birthdate</label>
        <input
          type="date"
          min="1960-01-01"
          max={new Date().toISOString().substring(0, 10)}
          value={birthdayInput}
          onChange={(e) => {
            setBirthDayInput(e.target.value);
            setFieldValue("birthday", Date.parse(birthdayInput));
          }}
        />
        <label className="mt-5">Location</label>
        <Field name="location_name" placeholder={"location_name"} />

        <div className="mt-5">
          <label htmlFor="gender">Gender</label>
          <div className="flex flex-col">
            <label>
              <Field name="gender" type="radio" value={Gender.Male} /> Male
            </label>
            <label>
              <Field name="gender" type="radio" value={Gender.Female} /> Female
            </label>
            <label>
              <Field name="gender" type="radio" value={Gender.Others} /> Others
            </label>
          </div>
        </div>
      </div>
    </FormLayout>
  );
};

export default CreateProfileForm;
