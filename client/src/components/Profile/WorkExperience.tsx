import { useState } from "react";
import {
  useDeleteWorkExperienceMutation,
  WorkExperienceFragment,
} from "../../generated/graphql";
import EditWorkExperience from "../Forms/EditWorkExperience";
import Loading from "../Loading/Loading";
import Modal from "../Modals/Modal";

interface WorkExperienceProps {
  work_experience: WorkExperienceFragment;
  profile_id: string;
}

const WorkExperience = ({
  work_experience,
  profile_id,
}: WorkExperienceProps) => {
  const work_position = work_experience.work_position;
  const workplace_name = work_experience.workplace_name;
  const work_description = work_experience.work_description;
  const id = work_experience.id;
  const joined_at = work_experience.joined_at;
  const left_at = work_experience.left_at;
  const joinedDate = new Date(joined_at).toISOString().substring(0, 10);
  const leftDate = new Date(left_at).toISOString().substring(0, 10);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const onRequestClose = () => setIsOpen(false);
  const [deleteWorkExperience, { loading: DeleteWorkExperienceLoading }] =
    useDeleteWorkExperienceMutation();
  const handleClickDelete = async () => {
    await deleteWorkExperience({
      variables: {
        where: {
          id,
        },
      },
    });
  };
  return (
    <>
      <div>{work_position}</div>
      <div>{workplace_name}</div>
      <div>
        {!joined_at ? null : joinedDate} - {!left_at ? null : leftDate}
      </div>
      <div>{work_description}</div>
      <button
        onClick={handleClickDelete}
        type="button"
        disabled={DeleteWorkExperienceLoading}
      >
        {DeleteWorkExperienceLoading ? <Loading /> : <div>Delete</div>}
      </button>
      <div onClick={openModal}>Edit</div>
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <EditWorkExperience
          profile_id={profile_id}
          work_experience={work_experience}
          onRequestClose={onRequestClose}
        />
      </Modal>
    </>
  );
};

export default WorkExperience;
