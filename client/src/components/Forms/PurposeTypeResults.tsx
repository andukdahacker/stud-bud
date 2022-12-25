import { ArrayHelpers, useFormikContext } from "formik";
import { useState } from "react";
import {
  CreateProfileInput,
  CreatePurposeTypeInput,
} from "../../generated/graphql";
import Modal from "../Modals/Modal";
import PurposeTypeExtendedDataModal from "../Modals/PurposeTypeExtendedDataModal";

interface PurposeTypeResultsProps extends ArrayHelpers {
  purpose_index: number;
}

const PurposeTypeResults = ({
  remove,
  purpose_index,
}: PurposeTypeResultsProps) => {
  const { values } = useFormikContext<CreateProfileInput>();
  const [isOpen, setIsOpen] = useState(false);
  const onRequestClose = () => setIsOpen(false);
  const getPurposeType = (index: number) => {
    return values.purpose[purpose_index].purpose_type[index];
  };

  const [purposeType, setPurposeType] = useState<CreatePurposeTypeInput>();

  return (
    <div className="flex w-full ">
      {values.purpose[purpose_index].purpose_type.map((purType, index) => {
        return (
          <div
            key={index}
            className="flex px-2 py-1 mr-2 bg-gray-300 border-2 border-black rounded-lg w-fit"
          >
            <div className="p-1 border-2 border-black border-dotted rounded-lg">
              {purType.purpose_type_name}
            </div>
            <button
              type="button"
              onClick={() => {
                const purpose_type = getPurposeType(index);
                setPurposeType(purpose_type);
                setIsOpen(true);
              }}
              className="ml-2 "
            >
              +
            </button>
            <button
              type="button"
              onClick={() => remove(index)}
              className="ml-2"
            >
              X
            </button>
          </div>
        );
      })}
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <PurposeTypeExtendedDataModal
          purType={purposeType}
          purpose_index={purpose_index}
        />
      </Modal>
    </div>
  );
};

export default PurposeTypeResults;
