import { Form, Formik, FormikValues } from "formik";
import { useState } from "react";
import {
  BuddyRequestFragment,
  useUpdateBuddyRequestMutation,
} from "../../generated/graphql";
import FormLayout from "../Layouts/FormLayout";
import Loading from "../Loading/Loading";
import ChosenPurposeTypeName from "./ChosenPurposeTypeName";
import ExtendedBuddyRequestDataForm from "./ExtendedBuddyRequestDataForm";
import SearchPurposeTypeField from "./SearchPurposeTypeField";

interface EditBuddyRequestProps {
  buddy_request: BuddyRequestFragment;
}

const EditBuddyRequest = ({ buddy_request }: EditBuddyRequestProps) => {
  const purpose_name = buddy_request.purpose.purpose_name;
  const purpose_type_name = buddy_request.purpose_type.purpose_type_name;
  const description = buddy_request.description;
  const extended_buddy_request_data = buddy_request.extended_buddy_request_data;
  const buddy_request_id = buddy_request.id;

  const [
    updateBuddyRequest,
    { data: UpdateBuddyRequestData, loading: UpdateBuddyRequestLoading },
  ] = useUpdateBuddyRequestMutation();

  const [search, setSearch] = useState("");

  const initialValues = {
    purpose_name,
    description,
    purpose_type_name,
    extended_buddy_request_data,
  };

  const onSubmit = async ({
    purpose_name,
    purpose_type_name,
    description,
    extended_buddy_request_data,
  }: FormikValues) => {
    await updateBuddyRequest({
      variables: {
        where: {
          buddy_request_id,
        },
        input: {
          purpose_name,
          purpose_type_name,
          description,
          extended_buddy_request_data,
        },
      },
    });
  };

  return (
    <FormLayout title="Edit your buddy request">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <ChosenPurposeTypeName />
          <SearchPurposeTypeField search={search} setSearch={setSearch} />
          <ExtendedBuddyRequestDataForm />
          <button type="submit" disabled={UpdateBuddyRequestLoading}>
            {UpdateBuddyRequestLoading ? <Loading /> : <div>Done</div>}
          </button>
        </Form>
      </Formik>
    </FormLayout>
  );
};

export default EditBuddyRequest;
