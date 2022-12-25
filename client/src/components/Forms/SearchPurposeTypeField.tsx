import { FormikValues, useFormikContext } from "formik";
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
import { useGetManyPurposeTypesLazyQuery } from "../../generated/graphql";
import useDebounce from "../../utils/useDebounce";

import Loading from "../Loading/Loading";

interface SearchPurposeTypeFieldProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const SearchPurposeTypeField = ({
  search,
  setSearch,
}: SearchPurposeTypeFieldProps) => {
  const { values, setFieldValue } = useFormikContext<FormikValues>();
  const [
    getManyPurposeTypes,
    { data: GetManyPurposeTypesData, loading: GetManyPurposeTypesLoading },
  ] = useGetManyPurposeTypesLazyQuery();
  const purpose_types =
    GetManyPurposeTypesData?.getManyPurposeTypes?.purpose_types;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleClick = (purpose_type_name: string) => {
    setFieldValue("purpose_type_name", purpose_type_name);
  };
  const purpose_name = values.purpose_name;
  const chosen_purpose_type_name = values.purpose_type_name;

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      getManyPurposeTypes({
        variables: {
          where: {
            purpose_type: debouncedSearch,
            partial: true,
          },
        },
      });
    }
  }, [debouncedSearch]);

  return (
    <>
      <input
        type="text"
        placeholder="type here"
        value={search}
        onChange={(e) => handleChange(e)}
      />
      <div>
        {GetManyPurposeTypesLoading ? (
          <Loading />
        ) : search == "" ? null : (
          purpose_types?.map((purType, index) => {
            const chosen =
              purType.purpose_type_name == chosen_purpose_type_name;
            const purpose = purType.purpose.purpose_name;
            const wrongPurpose = purpose !== purpose_name;

            if (chosen || wrongPurpose) {
              return null;
            } else {
              return (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={() => handleClick(purType.purpose_type_name)}
                >
                  {purType.purpose_type_name}
                </div>
              );
            }
          })
        )}
      </div>
    </>
  );
};

export default SearchPurposeTypeField;
