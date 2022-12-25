import { useFormikContext } from "formik";
import {
  CreateProfileInput,
  CreatePurposeTypeInput,
} from "../../generated/graphql";
import { Purposes } from "../../utils/constants";

interface PurposeTypeExtendedDataModalProps {
  purType?: CreatePurposeTypeInput;
  purpose_index: number;
}

const PurposeTypeExtendedDataModal = ({
  purType,
  purpose_index,
}: PurposeTypeExtendedDataModalProps) => {
  const { values } = useFormikContext<CreateProfileInput>();
  console.log(values.purpose);
  const purpose = values.purpose[purpose_index];
  let extended_data_fields: JSX.Element | null = null;

  switch (purpose.purpose_name) {
    case Purposes.Degree.name:
      extended_data_fields = (
        <div>
          <label htmlFor="">Band</label>
          <input type="text" placeholder="Band" />
          <label htmlFor="">Date</label>
          <input type="text" placeholder="Date" />
          <label htmlFor="">Description</label>
          <input type="text" placeholder="Description" />
        </div>
      );

      break;
    case Purposes.Courses.name:
      extended_data_fields = (
        <div>
          <label htmlFor="">Name</label>
          <input type="text" placeholder="Name" />
          <label htmlFor="">Fee</label>
          <input type="text" placeholder="Fee" />
          <label htmlFor="">Description</label>
          <input type="text" placeholder="Description" />
        </div>
      );

      break;
    case Purposes.Competition.name:
      extended_data_fields = (
        <div>
          <label htmlFor="">Description</label>
          <input type="text" placeholder="Description" />
        </div>
      );
      break;
    case Purposes.Habit.name:
      extended_data_fields = (
        <div>
          <label htmlFor="">Description</label>
          <input type="text" placeholder="Description" />
        </div>
      );
      break;
    case Purposes.Skills.name:
      extended_data_fields = (
        <div>
          <label htmlFor="">Description</label>
          <input type="text" placeholder="Description" />
        </div>
      );
      break;
    case Purposes.Study.name:
      extended_data_fields = (
        <div>
          <label htmlFor="">Description</label>
          <input type="text" placeholder="Description" />
        </div>
      );
      break;
    default:
      extended_data_fields = null;
  }

  if (!purType) return null;
  return (
    <div>
      <div>{purType.purpose_type_name}</div>
      <div>{purType.purpose_type_description}</div>
      <div>{extended_data_fields}</div>
    </div>
  );
};

export default PurposeTypeExtendedDataModal;
