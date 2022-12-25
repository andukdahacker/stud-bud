import { Field, FormikValues, useFormikContext } from "formik";
import { useState } from "react";
import { CreateBuddyRequestInput } from "../../generated/graphql";
import FormLayout from "../Layouts/FormLayout";
import Modal from "../Modals/Modal";
import ChosenPurposeTypeName from "./ChosenPurposeTypeName";
import CreateNewPurposeType from "./CreateNewPurposeType";
import ExtendedBuddyRequestDataForm from "./ExtendedBuddyRequestDataForm";

import RecommendPurposeTypeField from "./RecommendPurposeTypeField";
import SearchPurposeTypeField from "./SearchPurposeTypeField";

const CreateBuddyRequestPurposeTypeForm = () => {
  const { values, setFieldValue } = useFormikContext<
    FormikValues & CreateBuddyRequestInput
  >();

  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const onRequestClose = () => {
    setIsOpen(false);
  };

  const purpose_name = values.purpose_name;

  return (
    <FormLayout title="Tell us more detail">
      <div>
        <label>
          {purpose_name}
          <ChosenPurposeTypeName />
        </label>
        <SearchPurposeTypeField search={search} setSearch={setSearch} />
        <RecommendPurposeTypeField search={search} />
        <button type="button" onClick={() => setIsOpen(true)}>
          Create new
        </button>
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
          <CreateNewPurposeType
            purpose_name={purpose_name}
            setFieldValue={setFieldValue}
            closeModal={onRequestClose}
          />
        </Modal>
        <Field name="description" placeholder="Description" as="textarea" />
      </div>
      <ExtendedBuddyRequestDataForm />
    </FormLayout>
  );
};

export default CreateBuddyRequestPurposeTypeForm;
