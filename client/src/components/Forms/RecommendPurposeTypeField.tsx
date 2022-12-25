import { FormikValues, useFormikContext } from "formik";

import { Purposes } from "../../utils/constants";

interface RecommendPurposeTypeFieldProps {
  search: string;
}

const RecommendPurposeTypeField = ({
  search,
}: RecommendPurposeTypeFieldProps) => {
  if (search) return null;
  const { values, setFieldValue } = useFormikContext<FormikValues>();
  const purpose_name = values.purpose_name;
  const getRightPurpose = () => {
    switch (purpose_name) {
      case Purposes.Degree.name:
        return Purposes.Degree;
      case Purposes.Competition.name:
        return Purposes.Competition;
      case Purposes.Courses.name:
        return Purposes.Courses;
      case Purposes.Habit.name:
        return Purposes.Habit;
      case Purposes.Skills.name:
        return Purposes.Skills;
      case Purposes.Study.name:
        return Purposes.Study;
      case Purposes.Others.name:
        return null;
      default:
        return null;
    }
  };
  const chosen_purpose_type_name = values.purpose_type_name;

  const purpose = getRightPurpose();

  const handleClick = (purpose_type_name: string) => {
    setFieldValue("purpose_type_name", purpose_type_name);
  };

  return (
    <>
      <div className="flex">
        {purpose?.purpose_types.map((purpType, index) => {
          const chosen = purpType.name == chosen_purpose_type_name;
          if (chosen) return null;
          return (
            <div
              key={index}
              onClick={() => handleClick(purpType.name)}
              className="ml-1 cursor-pointer"
            >
              {purpType.name}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RecommendPurposeTypeField;
