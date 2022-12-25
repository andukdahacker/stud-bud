import { FormikValues, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { useGetManyPurposeTypesLazyQuery } from "../../generated/graphql";
import { Purposes } from "../../utils/constants";

import FormLayout from "../Layouts/FormLayout";
import Loading from "../Loading/Loading";
import { FiX } from "react-icons/fi";
import SearchBar from "../Search/SearchBar";

const OnboardingSelectPurposeTypeField = () => {
  const { values, setFieldValue } = useFormikContext<FormikValues>();

  const [getManyPurposeType, { data, loading }] =
    useGetManyPurposeTypesLazyQuery();
  const purpose_types = data?.getManyPurposeTypes?.purpose_types;

  const fetchPurposeTypes = async (value: string) => {
    await getManyPurposeType({
      variables: {
        where: {
          purpose_type: value,
          partial: true,
        },
      },
    });
  };

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

  const purpose = getRightPurpose();

  const [purposeType, setPurposeType] = useState<string[]>([]);

  useEffect(() => {
    setFieldValue("purpose_types", purposeType);
  }, [purposeType]);

  const searchPurposeTypes = () => {
    return (
      <div className="">
        <SearchBar searchQuery={fetchPurposeTypes}>
          {purpose_types?.map((purpType, index) => {
            if (purpType.purpose.purpose_name != purpose_name) return null;
            const chosen = purposeType.find(
              (e) => e == purpType.purpose_type_name
            );
            if (chosen) return null;
            return (
              <div
                key={index}
                className="w-full px-2 py-1 bg-white border-b cursor-pointer border-x "
                onClick={() =>
                  setPurposeType((e) => [...e, purpType.purpose_type_name])
                }
              >
                {purpType.purpose_type_name}
              </div>
            );
          })}
        </SearchBar>
        {loading ?? (
          <div className="absolute right-0">
            <Loading />
          </div>
        )}
      </div>
    );
  };

  const recommendedPurposeTypes = () => {
    return (
      <>
        <div className="flex flex-wrap max-w-xs ">
          {purpose?.purpose_types.map((purp_type, index) => {
            const chosen = purposeType.find((e) => e == purp_type.name);
            if (chosen) return null;
            return (
              <div
                key={index}
                className="px-3 py-2 mt-2 mr-2 text-center bg-gray-200 cursor-pointer w-fit rounded-xl"
                onClick={() => setPurposeType((e) => [...e, purp_type.name])}
              >
                {purp_type.name}
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const chosenPurposeTypes = () => {
    return (
      <>
        <div className="flex flex-wrap">
          {purposeType.map((purp_type, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-center px-2 py-1 mr-2 bg-gray-200 rounded-md w-fit"
              >
                <div>{purp_type}</div>
                <button
                  type="button"
                  className="flex items-center justify-center w-4 h-4 ml-2 text-center text-black rounded-full bg-slate-500"
                  onClick={() => {
                    setPurposeType((e) => {
                      const index = e.findIndex((x) => x == purp_type);
                      const newArray = e.splice(index, 1);

                      return newArray;
                    });
                  }}
                >
                  <FiX />
                </button>
              </div>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <>
      <FormLayout title="Tell us more">
        <div className="p-2">
          <div>{purpose?.name}</div>
          <div className="">{chosenPurposeTypes()}</div>
          <div className="my-5">{searchPurposeTypes()}</div>
          <div>{recommendedPurposeTypes()}</div>
        </div>
      </FormLayout>
    </>
  );
};

export default OnboardingSelectPurposeTypeField;
