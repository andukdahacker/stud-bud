import { Field } from "formik";
import { Purposes } from "../../utils/constants";
import FormLayout from "../Layouts/FormLayout";

const CreateBuddyRequestPurposeForm = () => {
  let selections = [];
  for (const [key, value] of Object.entries(Purposes)) {
    selections.push(
      <div key={key} className="">
        <label>{key}</label>
        <Field type="radio" name="purpose_name" value={value.name} />
      </div>
    );
  }
  return (
    <FormLayout title="Fill in the information you want">
      {selections}
    </FormLayout>
  );
};

export default CreateBuddyRequestPurposeForm;
