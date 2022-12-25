import FormLayout from "../Layouts/FormLayout";
import PurposeRadioGroup from "./PurposeRadioGroup";

const OnboardingPurposeForm = () => {
  return (
    <>
      <FormLayout title="You want to find a buddy to">
        <PurposeRadioGroup />
      </FormLayout>
    </>
  );
};

export default OnboardingPurposeForm;
