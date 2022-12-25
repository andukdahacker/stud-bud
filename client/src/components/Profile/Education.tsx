import { useState } from "react";
import {
  EducationFragment,
  useDeleteEducationMutation,
} from "../../generated/graphql";
import EditEducation from "../Forms/EditEducation";
import Loading from "../Loading/Loading";
import Modal from "../Modals/Modal";

interface EducationProps {
  education: EducationFragment;
  profile_id: string;
}

const Education = ({ education, profile_id }: EducationProps) => {
  const institution_name = education.institution_name;
  const field_of_study = education.field_of_study;
  const education_description = education.education_description;
  const id = education.id;
  const joined_at = education.joined_at;
  const left_at = education.left_at;
  const joinedDate = new Date(joined_at).toISOString().substring(0, 10);
  const leftDate = new Date(left_at).toISOString().substring(0, 10);
  const [deleteEducation, { loading: DeleteEducationLoading }] =
    useDeleteEducationMutation();
  const handleClickDelete = async () => {
    await deleteEducation({
      variables: {
        where: {
          id,
        },
      },
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const onRequestClose = () => setIsOpen(false);
  return (
    <>
      <div>{institution_name}</div>
      <div>{field_of_study}</div>
      <div>{education_description}</div>
      <div>
        {joined_at ? joinedDate : null} - {left_at ? leftDate : null}
      </div>
      <button
        type="button"
        onClick={handleClickDelete}
        disabled={DeleteEducationLoading}
      >
        {DeleteEducationLoading ? <Loading /> : <div>Delete</div>}
      </button>
      <div onClick={openModal}>Edit</div>

      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <EditEducation
          education={education}
          onRequestClose={onRequestClose}
          profile_id={profile_id}
        />
      </Modal>
    </>
  );
};

export default Education;
