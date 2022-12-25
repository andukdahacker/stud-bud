import { FormikValues, useFormikContext } from "formik";
import { Purposes } from "../../utils/constants";

const ExtendedBuddyRequestDataForm = () => {
  const { values, setFieldValue } = useFormikContext<FormikValues>();
  const purpose_name = values.purpose_name;
  switch (purpose_name) {
    case Purposes.Degree.name:
      return (
        <>
          <div>
            <label>Target score</label>
            <input
              type="text"
              onChange={(e) => {
                setFieldValue("extended_buddy_request_data", {
                  ...values.extended_buddy_request_data,
                  target_score: e.target.value,
                });
              }}
            />
            <label>Examination date</label>
            <input
              type="text"
              onChange={(e) => {
                setFieldValue("extended_buddy_request_data", {
                  ...values.extended_buddy_request_data,
                  examination_date: e.target.value,
                });
              }}
            />
          </div>
        </>
      );
    case Purposes.Courses.name:
      return (
        <>
          <div>
            <label>Course fee</label>
            <input
              type="text"
              onChange={(e) => {
                setFieldValue("extended_buddy_request_data", {
                  ...values.extended_buddy_request_data,
                  course_fee: e.target.value,
                });
              }}
            />
            <label>Description</label>
            <input
              type="text"
              onChange={(e) => {
                setFieldValue("extended_buddy_request_data", {
                  ...values.extended_buddy_request_data,
                  description: e.target.value,
                });
              }}
            />
          </div>
        </>
      );
    default:
      return null;
  }
};

export default ExtendedBuddyRequestDataForm;
