import { Field } from "formik";
import { Purposes } from "../../utils/constants";

const PurposeRadioGroup = () => {
  let selections = [];
  for (const [key, value] of Object.entries(Purposes)) {
    selections.push(
      <div
        key={key}
        className="flex items-center justify-center w-full h-20 p-5 border-b border-black"
      >
        <Field
          type="radio"
          name="purpose_name"
          value={value.name}
          className="basis-1/3"
        />
        <div className="basis-2/3">
          <label className="font-bold">{key}</label>
          <div>Example:</div>
        </div>
      </div>
    );
  }

  return <div className="">{selections}</div>;
};

export default PurposeRadioGroup;
