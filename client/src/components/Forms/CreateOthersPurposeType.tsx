import { ChangeEvent, useEffect, useState } from "react";
import {
  CreatePurposeInput,
  useGetManyPurposeTypesLazyQuery,
} from "../../generated/graphql";
import useDebounce from "../../utils/useDebounce";
import Loading from "../Loading/Loading";

interface CreateOtherPurposeTypeProps {
  purpose: CreatePurposeInput | undefined;
  closeModal: () => void;
}

const CreateOtherPurposeType = ({
  purpose,
  closeModal,
}: CreateOtherPurposeTypeProps) => {
  if (!purpose) return null;

  const [getManyPurposeTypes, { data, loading }] =
    useGetManyPurposeTypesLazyQuery();

  const existingPurposeType = data?.getManyPurposeTypes?.purpose_types;
  const notExist = existingPurposeType?.length === 0 || !existingPurposeType;

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    name: "Name" | "Description"
  ) => {
    e.preventDefault();
    if (name == "Description") setDescription(e.target.value);
    if (name == "Name") setName(e.target.value);
  };

  const handleSubmit = () => {
    purpose.purpose_type.push({
      purpose_type_name: name,
      purpose_type_description: description,
    });
    closeModal();
  };

  const debounceSearch = useDebounce(name, 500);

  useEffect(() => {
    if (debounceSearch) {
      getManyPurposeTypes({
        variables: {
          where: {
            purpose_type: debounceSearch,
            partial: false,
          },
        },
      });
    }
  }, [debounceSearch]);

  return (
    <>
      <div>{purpose?.purpose_name}</div>
      <label htmlFor="">Name</label>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => handleChange(e, "Name")}
      />
      <div>{loading ? <Loading /> : notExist ? null : <>Already exist</>}</div>
      <label>Description</label>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => handleChange(e, "Description")}
      />

      <button
        type="button"
        onClick={handleSubmit}
        disabled={notExist ? false : true}
      >
        Done
      </button>
    </>
  );
};

export default CreateOtherPurposeType;
