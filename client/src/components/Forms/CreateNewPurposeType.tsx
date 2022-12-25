import { useEffect, useState } from "react";
import {
  useCreatePurposeTypeMutation,
  useGetUniquePurposeTypeLazyQuery,
} from "../../generated/graphql";
import useDebounce from "../../utils/useDebounce";
import Loading from "../Loading/Loading";

interface CreateNewPurposeTypeProps {
  purpose_name: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  closeModal?: () => void;
}

const CreateNewPurposeType = ({
  purpose_name,
  setFieldValue,
  closeModal,
}: CreateNewPurposeTypeProps) => {
  const [search, setSearch] = useState("");
  const [description, setDescription] = useState("");
  const [
    getUniquePurposeType,
    { data: GetUniquePurposeTypeData, loading: GetUniquePurposeTypeLoading },
  ] = useGetUniquePurposeTypeLazyQuery();
  const [createPurposeType, { loading: CreatePurposeTypeLoading }] =
    useCreatePurposeTypeMutation();

  const purpose_type =
    GetUniquePurposeTypeData?.getUniquePurposeType?.purpose_type;

  const onSubmit = async () => {
    const result = await createPurposeType({
      variables: {
        input: {
          purpose_type_name: debouncedSearch,
          purpose_type_description: description,
          purpose_name,
        },
      },
    });

    if (result.data?.createPurposeType?.IOutput.success) {
      const new_purpose_type_name =
        result.data.createPurposeType.purpose_type?.purpose_type_name;
      setFieldValue("purpose_type_name", new_purpose_type_name);
      if (closeModal) closeModal();
    }
  };

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      getUniquePurposeType({
        variables: {
          where: {
            purpose_type_name: debouncedSearch,
          },
        },
        fetchPolicy: "network-only",
      });
    }
  }, [debouncedSearch]);

  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      {GetUniquePurposeTypeLoading ? (
        <Loading />
      ) : purpose_type ? (
        <div>Already existed</div>
      ) : null}

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />

      <button
        type="button"
        onClick={onSubmit}
        disabled={CreatePurposeTypeLoading}
      >
        Submit
      </button>
    </>
  );
};

export default CreateNewPurposeType;
