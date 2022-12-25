import { FormikValues, useFormikContext } from "formik";

const ChosenPurposeTypeName = () => {
  const { values, setFieldValue } = useFormikContext<FormikValues>();

  const chosen_purpose_type_name = values.purpose_type_name;

  // useEffect(() => {
  //   setFieldValue("purpose_type_name", "");
  // }, []);

  if (chosen_purpose_type_name == "") return null;

  return (
    <>
      <div className="bg-red-200">
        <div>{chosen_purpose_type_name}</div>
        <div onClick={() => setFieldValue("purpose_type_name", "")}>X</div>
      </div>
    </>
  );
};

export default ChosenPurposeTypeName;
